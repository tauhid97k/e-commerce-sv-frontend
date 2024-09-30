"use client";

import { buttonVariants } from "@/components/button";
import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import { DataTable } from "@/components/table";
import { PaginatedData, Review } from "@/lib/dataTypes";
import { ColumnDef } from "@tanstack/react-table";
import { CheckSelector } from "@/components/filters/check-selector";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getReviews } from "@/actions/reviews";
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from "@/components/dropdown";
import { cn } from "@/lib/utils";

const ReviewsTable = ({ queries }: { queries: string }) => {
  // Get Reviews
  const { data: reviews } = useSuspenseQuery({
    queryKey: ["reviews", queries],
    queryFn: (): Promise<PaginatedData<Review>> => getReviews(queries),
  });

  // Review Table Columns
  const columns: ColumnDef<Review>[] = [
    {
      header: "User",
      accessorKey: "user",
    },
    {
      header: "Product",
      accessorKey: "product",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      header: "Approved",
      accessorKey: "isApproved",
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

  // Rating Filters
  const ratingOptions = [
    {
      label: "1 Star",
      value: "1",
    },
    {
      label: "2 Stars",
      value: "2",
    },
    {
      label: "3 Stars",
      value: "3",
    },
    {
      label: "4 Stars",
      value: "4",
    },
    {
      label: "5 Stars",
      value: "5",
    },
  ];

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h2 className="text-2xl text-dark-200">Ratings</h2>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <CheckSelector
              title="Rating"
              filter="rating"
              options={ratingOptions}
            />
          </div>
        </div>
        <DataTable data={reviews} columns={columns} />
      </div>
    </>
  );
};

export default ReviewsTable;
