import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ReviewsForm } from "@/modules/library/ui/components/review-form";

interface Props {
  productId: string;
}

export const ReviewSidebar = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.reviews.getOne.queryOptions({ productId })
  );

  return <ReviewsForm productId={productId} initialData={data} />;
};
