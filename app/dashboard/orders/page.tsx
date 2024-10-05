import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getOrders } from "@/actions/orders";
import { getQueryClient } from "@/lib/query-client";
import OrdersTable from "./table";

const OrdersPage = ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    status?: string;
  };
}) => {
  const queryClient = getQueryClient();

  // URL Params
  const page = searchParams?.page || 1;
  const status = searchParams?.status || "";

  const queries = `page=${page}&rating=${status}`;

  // Prefetch Orders
  queryClient.prefetchQuery({
    queryKey: ["orders", queries],
    queryFn: () => getOrders(queries),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersTable queries={queries} />
    </HydrationBoundary>
  );
};

export default OrdersPage;
