import { fetcher } from "@/lib/fetcher";

// Get all reviews (For Admin)
export const getReviews = async (queries: string) => {
  return await fetcher(`admin/reviews?${queries}`);
};
