"use client";
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";
import superjson from "superjson";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Returns a React Query client instance appropriate for the current environment.
 *
 * On the server, always creates a new client. On the browser, returns a singleton client instance to ensure consistency across renders and React suspense events.
 *
 * @returns A React Query client instance.
 */
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Returns the tRPC API URL, using a relative path on the client and an absolute URL based on the `NEXT_PUBLIC_APP_URL` environment variable on the server.
 *
 * @returns The URL string for the tRPC API endpoint.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    return process.env.NEXT_PUBLIC_APP_URL;
  })();
  return `${base}/api/trpc`;
}
/**
 * Provides tRPC and React Query context to its child components for seamless data fetching and caching.
 *
 * Wraps children with both the React Query and tRPC providers, ensuring a properly configured client instance is available throughout the component tree.
 *
 * @param children - The React nodes that will have access to the tRPC and React Query context.
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson, // <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
