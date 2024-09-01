'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { PaginatedData } from '@/lib/dataTypes'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Table Props Interface
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedData<TData>
}

export const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams()

  // Init table
  const table = useReactTable({
    data: data.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Handle Pagination
  const handlePagination = (url: string) => {
    const page = new URL(url).searchParams.get('page') ?? '1'
    const currentParams = new URLSearchParams(searchParams)

    currentParams.set('page', page)
    return `?${currentParams}`
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-[15px]">
          <thead className="text-base tracking-wide text-zinc-700 dark:text-zinc-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="h-12 px-6 text-left text-dark-200 align-middle font-medium [&:has([role=checkbox])]:pr-0 whitespace-nowrap bg-light-100 border-y"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="px-6 py-4 align-middle [&:has([role=checkbox])]:pr-0 max-w-[230px] truncate border-b"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-28 text-center text-lg"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="py-4 flex items-center flex-wrap justify-center gap-2 border-t border-zinc-200 dark:border-zinc-700">
        {data?.meta?.links.map((link) =>
          link.url ? (
            <Link
              className={`h-10 min-w-10 flex items-center justify-center rounded p-3 ${
                link.active ? 'bg-primary-200 text-white' : 'hover:bg-light-200'
              }`}
              key={link.label}
              href={handlePagination(link.url)}
              scroll={false}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ) : (
            <span
              className="h-10 p-3 flex items-center justify-center rounded opacity-70"
              key={link.label}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          )
        )}
      </div>
    </>
  )
}
