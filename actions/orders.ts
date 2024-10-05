import { fetcher } from "@/lib/fetcher";

// Get all Orders (For Admin)
export const getOrders = async (queries: string) => {
  return await fetcher(`admin/orders?${queries}`);
};
