"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "sonner";
import ApolloClientProvider from "@/lib/apollo-client";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ApolloClientProvider>
      <Provider store={store}>
        {children}
        <Toaster position="top-right" />
      </Provider>
    </ApolloClientProvider>
  );
}
