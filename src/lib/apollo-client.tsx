"use client";

import { REFRESH_AUTH_TOKEN } from "@/apollo/mutations/refreshAuthToken";
import {
  ApolloClient,
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
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return Boolean(authToken && refreshToken);
};

const getAuthToken = async (): Promise<string> => {
  let authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!authToken) {
    authToken = await fetchAuthToken();
  }
  return authToken;
};

const getSessionToken = (): string | null =>
  sessionStorage.getItem(SESSION_TOKEN_KEY);

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

// Create the Apollo client instance.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Providers component that wraps its children with ApolloProvider.
const Providers = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Providers;
