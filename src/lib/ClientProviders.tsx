"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Providers from "@/lib/apollo-client";
import { Toaster } from "sonner";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Providers>
      <Provider store={store}>
        {children}
        <Toaster position="top-right" />
      </Provider>
    </Providers>
  );
}
