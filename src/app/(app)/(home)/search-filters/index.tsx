"use client";

import { CustomCategory } from "@/app/(app)/(home)/types";
import { Categories } from "@/app/(app)/(home)/search-filters/categories";
import { SearchInput } from "@/app/(app)/(home)/search-filters/search-input";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  data: CustomCategory[];
}

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
