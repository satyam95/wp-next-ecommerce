"use client";

import { REFRESH_AUTH_TOKEN } from "@/apollo/mutations/refreshAuthToken";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Cache environment variables.
const WORDPRESS_SITE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
const GRAPHQL_ENDPOINT = `${WORDPRESS_SITE_URL}/graphql`;
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!;
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!;
const SESSION_TOKEN_KEY = process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY!;
const AUTH_KEY_TIMEOUT = Number(process.env.NEXT_PUBLIC_AUTH_KEY_TIMEOUT) || 30000;

let tokenSetter: ReturnType<typeof setInterval> | null = null;

const fetchAuthToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return "";
  }

  try {
    const tempClient = new ApolloClient({
      link: createHttpLink({ uri: GRAPHQL_ENDPOINT, credentials: "include" }),
      cache: new InMemoryCache(),
    });

    const { data } = await tempClient.mutate({
      mutation: REFRESH_AUTH_TOKEN,
      variables: { refreshToken },
    });

    const newAuthToken = data?.refreshJwtAuthToken?.authToken;
    if (!newAuthToken) {
      throw new Error("Failed to retrieve a new auth token");
    }

    sessionStorage.setItem(AUTH_TOKEN_KEY, newAuthToken);

    if (tokenSetter) {
      clearInterval(tokenSetter);
    }
    tokenSetter = setInterval(async () => {
      if (!hasCredentials()) {
        if (tokenSetter) {
          clearInterval(tokenSetter);
          tokenSetter = null;
        }
        return;
      }
      await fetchAuthToken();
    }, AUTH_KEY_TIMEOUT);

    return newAuthToken;
  } catch (error) {
    console.error(error);
    return "";
  }
};

const hasCredentials = (): boolean => {
  const authToken = typeof window !== 'undefined' ? sessionStorage.getItem(AUTH_TOKEN_KEY) : null;
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  return Boolean(authToken && refreshToken);
};

const getAuthToken = async (): Promise<string> => {
  let authToken = typeof window !== 'undefined' ? sessionStorage.getItem(AUTH_TOKEN_KEY) : null;
  if (!authToken) {
    authToken = await fetchAuthToken();
  }
  return authToken || "";
};

const getSessionToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(SESSION_TOKEN_KEY);
  }
  return null;
};

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const authToken = await getAuthToken();
  const sessionToken = getSessionToken();
  return {
    headers: {
      ...headers,
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...(sessionToken && { "woocommerce-session": `Session ${sessionToken}` }),
    },
  };
});

// Afterware to capture and store the session token from response headers
const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    if (typeof window !== 'undefined') {
      const context = operation.getContext();
      const { response: { headers } } = context;
      const session = headers.get("woocommerce-session");
      if (session) {
        if (session === "false") {
          sessionStorage.removeItem(SESSION_TOKEN_KEY);
        } else if (sessionStorage.getItem(SESSION_TOKEN_KEY) !== session) {
          sessionStorage.setItem(SESSION_TOKEN_KEY, session);
        }
      }
    }
    return response;
  });
});

// Create the Apollo client instance with authLink, afterware, and httpLink
const client = new ApolloClient({
  link: authLink.concat(afterware).concat(httpLink),
  cache: new InMemoryCache(),
});

// Providers component that wraps its children with ApolloProvider.
const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientProvider;