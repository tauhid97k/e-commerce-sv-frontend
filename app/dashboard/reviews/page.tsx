import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getReviews } from "@/actions/reviews";
import { getQueryClient } from "@/lib/query-client";
import ReviewsTable from "./table";

const ReviewsPage = ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    rating?: string;
  };
}) => {
  const queryClient = getQueryClient();

  // URL Params
  const page = searchParams?.page || 1;
  const rating = searchParams?.rating || "";

  const queries = `page=${page}&rating=${rating}`;

  // Prefetch Products
  queryClient.prefetchQuery({
    queryKey: ["reviews", queries],
    queryFn: () => getReviews(queries),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewsTable queries={queries} />
    </HydrationBoundary>
  );
};

export default ReviewsPage;
