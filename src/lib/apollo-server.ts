// File: lib/apollo-server.ts

import { cookies } from "next/headers";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Environment variables
const WORDPRESS_SITE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
const GRAPHQL_ENDPOINT = `${WORDPRESS_SITE_URL}/graphql`;
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!;
const SESSION_TOKEN_KEY = process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY!;

export const getServerApolloClient = () => {
  // Get cookies from the incoming request
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_KEY)?.value || null;
  const sessionToken = cookieStore.get(SESSION_TOKEN_KEY)?.value || null;

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include",
  });

  // Attach authentication headers if tokens exist
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(sessionToken ? { "woocommerce-session": `Session ${sessionToken}` } : {}),
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true, // ensures that Apollo knows we are on server
  });
};
