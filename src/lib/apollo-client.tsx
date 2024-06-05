"use client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
  cache,
});

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Providers;
