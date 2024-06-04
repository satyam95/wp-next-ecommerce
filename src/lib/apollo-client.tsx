"use client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
});

console.log(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL);

const client = new ApolloClient({
  link,
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
