"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "sonner";
import ApolloClientProvider from "@/lib/apollo-client";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface ClientProvidersProps {
  children: React.ReactNode;
}

let persistor = persistStore(store);

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ApolloClientProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        {children}
        <Toaster position="top-right" />
        </PersistGate>
      </Provider>
    </ApolloClientProvider>
  );
}
