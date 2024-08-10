'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronsUpDown } from 'lucide-react'

// Data Table Props
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Init table
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto">
      <table className="w-full text-[15px]">
        <thead className="text-base tracking-wide text-zinc-700 dark:text-zinc-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="h-12 px-6 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 whitespace-nowrap bg-light border-y"
                    key={header.id}
                  >
                    <div className="flex items-center gap-x-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <ChevronsUpDown className="size-4" />
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-6 py-4 align-middle [&:has([role=checkbox])]:pr-0 max-w-[230px] truncate text-gray-600 border-b"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-28 text-center text-lg">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
