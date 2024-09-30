"use client";

import { buttonVariants } from "@/components/button";
import { EllipsisVertical, Eye, Pencil, Plus, Trash } from "lucide-react";
import { Input } from "@/components/input";
import { DataTable } from "@/components/table";
import { PaginatedData, Product } from "@/lib/dataTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useDebounceCallback } from "usehooks-ts";
import { CheckSelector } from "@/components/filters/check-selector";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/products";
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from "@/components/dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProductsTable = ({ queries }: { queries: string }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  // Get Products
  const { data: products } = useSuspenseQuery({
    queryKey: ["products", queries],
    queryFn: (): Promise<PaginatedData<Product>> => getProducts(queries),
  });

  // Product Table Columns
  const columns: ColumnDef<Product>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    {
      header: "Total Categories",
      accessorKey: "totalCategories",
    },
    {
      header: "Total Variants",
      accessorKey: "totalVariants",
    },
    {
      header: "Visibility",
      accessorKey: "isVisible",
    },
    {
      header: "Published At",
      accessorKey: "publishedAt",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Last Update",
      accessorKey: "updatedAt",
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

  // Handle Search (Debounced)
  const handleSearch = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;

      if (searchValue) {
        params.set("search", searchValue);
        params.set("page", "1");
      } else {
        params.delete("search");
        params.delete("page");
      }

      router.push(`?${params}`);
    },
    300
  );

  // Visibility Filters
  const visibilityOptions = [
    {
      label: "Visible",
      value: "true",
    },
    {
      label: "Invisible",
      value: "false",
    },
  ];

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h2 className="text-2xl text-dark-200">Products</h2>
            <Link
              href="/dashboard/products/add"
              className={cn(buttonVariants())}
            >
              <Plus className="icon" />
              <span>Add Product</span>
            </Link>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Input
              type="search"
              name="search"
              defaultValue={params.get("search")?.toString()}
              onChange={handleSearch}
              placeholder="Search product name..."
              className="sm:w-72"
            />
            <CheckSelector
              title="Visibility"
              filter="visibility"
              options={visibilityOptions}
            />
          </div>
        </div>
        <DataTable data={products} columns={columns} />
      </div>
    </>
  );
};

export default ProductsTable;
