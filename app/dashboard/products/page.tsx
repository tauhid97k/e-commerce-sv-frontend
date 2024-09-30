import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getProducts } from "@/actions/products";
import { getQueryClient } from "@/lib/query-client";
import ProductsTable from "./table";

const ProductsPage = ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
    visibility?: string;
  };
}) => {
  const queryClient = getQueryClient();

  // URL Params
  const page = searchParams?.page || 1;
  const search = searchParams?.search || "";
  const visibility = searchParams?.visibility || "";

  const queries = `page=${page}&search=${search}&visibility=${visibility}`;

  // Prefetch Products
  queryClient.prefetchQuery({
    queryKey: ["products", queries],
    queryFn: () => getProducts(queries),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsTable queries={queries} />
    </HydrationBoundary>
  );
};

export default ProductsPage;
