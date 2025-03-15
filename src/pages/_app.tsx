import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers } from "@/lib/providers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
