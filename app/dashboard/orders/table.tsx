"use client";

import { buttonVariants } from "@/components/button";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import { DataTable } from "@/components/table";
import { PaginatedData, Order } from "@/lib/dataTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getOrders } from "@/actions/orders";
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from "@/components/dropdown";
import { cn } from "@/lib/utils";

const OrdersTable = ({ queries }: { queries: string }) => {
  // Get Orders
  const { data: orders } = useSuspenseQuery({
    queryKey: ["orders", queries],
    queryFn: (): Promise<PaginatedData<Order>> => getOrders(queries),
  });

  // Order Table Columns
  const columns: ColumnDef<Order>[] = [
    {
      header: "Order No.",
      accessorKey: "orderNumber",
    },
    {
      header: "Total Items",
      accessorKey: "totalItems",
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Currency",
      accessorKey: "currency",
    },
    {
      header: "Visibility",
      accessorKey: "isVisible",
    },
    {
      header: "Order Date",
      accessorKey: "createdAt",
    },
    {
      id: "action",
      header: "Action",
      cell: () => {
        return (
          <>
            {/* Action Dropdown */}
            <Dropdown>
              <DropdownTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <EllipsisVertical className="icon" />
              </DropdownTrigger>
              <DropdownItems className="p-2">
                <DropdownItem>
                  <Eye className="icon" />
                  <span>View</span>
                </DropdownItem>
                <DropdownItem>
                  <Pencil className="icon" />
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem destructive>
                  <Trash className="icon" />
                  <span>Delete</span>
                </DropdownItem>
              </DropdownItems>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h2 className="text-2xl text-dark-200">Orders</h2>
          </div>
        </div>
        <DataTable data={orders} columns={columns} />
      </div>
    </>
  );
};

export default OrdersTable;
