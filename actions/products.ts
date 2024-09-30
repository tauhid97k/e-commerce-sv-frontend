import { fetcher } from "@/lib/fetcher";

// Get all products (For Admin)
export const getProducts = async (queries: string) => {
  return await fetcher(`admin/products?${queries}`);
};
