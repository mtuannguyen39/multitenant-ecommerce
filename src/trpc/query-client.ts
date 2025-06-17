import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

/**
 * Creates and returns a new {@link QueryClient} instance with custom default options.
 *
 * The returned client sets queries to remain fresh for 30 seconds and customizes dehydration to include queries with a `"pending"` status in addition to the default behavior.
 *
 * @returns A configured {@link QueryClient} instance.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
