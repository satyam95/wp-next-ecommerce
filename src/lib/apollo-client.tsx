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

// A variable to hold our token refresh interval ID.
let tokenSetter: ReturnType<typeof setInterval> | null = null;

// Define the refresh auth token mutation.


/**
 * Fetches a new auth token using the refresh token via Apollo Client.
 */
const fetchAuthToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    // No refresh token means the user is not authenticated.
    return "";
  }

  try {
    // Create a temporary Apollo client without the auth link to perform the mutation.
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

    // Save the new auth token in sessionStorage.
    sessionStorage.setItem(AUTH_TOKEN_KEY, newAuthToken);

    // Set up a periodic token refresh.
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

/**
 * Checks if both auth and refresh tokens are present.
 */
const hasCredentials = (): boolean => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return Boolean(authToken && refreshToken);
};

/**
 * Retrieves the auth token from sessionStorage, or fetches a new one if needed.
 */
const getAuthToken = async (): Promise<string> => {
  let authToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (!authToken) {
    authToken = await fetchAuthToken();
  }
  return authToken;
};

/**
 * Retrieves the WooCommerce session token from sessionStorage.
 */
const getSessionToken = (): string | null =>
  sessionStorage.getItem(SESSION_TOKEN_KEY);

// Create the HTTP link to your GraphQL endpoint.
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

// Create an auth link that adds both the Authorization and woocommerce-session headers.
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
