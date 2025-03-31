// File: lib/apollo-server.ts

import { cookies } from "next/headers";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Cache environment variables
const WORDPRESS_SITE_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
const GRAPHQL_ENDPOINT = `${WORDPRESS_SITE_URL}/graphql`;
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!;
const SESSION_TOKEN_KEY = process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY!;

// Create an Apollo Client instance for server-side use
export const getServerApolloClient = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_KEY)?.value || null;
  const sessionToken = cookieStore.get(SESSION_TOKEN_KEY)?.value || null;

  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...(sessionToken && { "woocommerce-session": `Session ${sessionToken}` }),
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};