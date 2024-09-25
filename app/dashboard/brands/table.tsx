'use client'

import { Button, buttonVariants } from '@/components/button'
import { EllipsisVertical, Eye, Pencil, Plus, Trash } from 'lucide-react'
import { Input } from '@/components/input'
import { DataTable } from '@/components/table'
import { PaginatedData, Brand } from '@/lib/dataTypes'
import { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { useDebounceCallback } from 'usehooks-ts'
import { CheckSelector } from '@/components/filters/check-selector'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getBrands } from '@/actions/brands'
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from '@/components/dropdown'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import AddBrandModal from './add-brand-modal'
import DeleteBrandModal from './delete-brand-modal'

const BrandsTable = ({ queries }: { queries: string }) => {
  const [addBrandModal, setAddBrandModal] = useState(false)
  const [deleteBrandModal, setDeleteBrandModal] = useState(false)
  const [selectedBrandId, setSelectedBrandId] = useState<number | string>('')
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // Get Brands
  const { data: brands } = useSuspenseQuery({
    queryKey: ['brands', queries],
    queryFn: (): Promise<PaginatedData<Brand>> => getBrands(queries),
  })

  // Brand Table Columns
  const columns: ColumnDef<Brand>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Slug',
      accessorKey: 'slug',
    },
    {
      header: 'Website',
      accessorKey: 'website',
    },
    {
      header: 'Visibility',
      accessorKey: 'isVisible',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
    },
    {
      header: 'Last Update',
      accessorKey: 'updatedAt',
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const { id } = row.original

        return (
          <>
            {/* Action Dropdown */}
            <Dropdown>
              <DropdownTrigger
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'icon' })
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
                <DropdownItem
                  onClick={() => {
                    setSelectedBrandId(id)
                    setDeleteBrandModal(true)
                  }}
                  destructive
                >
                  <Trash className="icon" />
                  <span>Delete</span>
                </DropdownItem>
              </DropdownItems>
            </Dropdown>
          </>
        )
      },
    },
  ]

  // Handle Search (Debounced)
  const handleSearch = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value

      if (searchValue) {
        params.set('search', searchValue)
        params.set('page', '1')
      } else {
        params.delete('search')
        params.delete('page')
      }

      router.push(`?${params}`)
    },
    300
  )

  // Visibility Filters
  const visibilityOptions = [
    {
      label: 'Visible',
      value: 'true',
    },
    {
      label: 'Invisible',
      value: 'false',
    },
  ]

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h2 className="text-2xl text-dark-200">Brands</h2>
            <Button onClick={() => setAddBrandModal(true)}>
              <Plus className="icon" />
              <span>Add Brand</span>
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Input
              type="search"
              name="search"
              defaultValue={params.get('search')?.toString()}
              onChange={handleSearch}
              placeholder="Search brand name..."
              className="sm:w-72"
            />
            <CheckSelector
              title="Visibility"
              filter="visibility"
              options={visibilityOptions}
            />
          </div>
        </div>
        <DataTable data={brands} columns={columns} />
      </div>

      {/* Add Brand Form Modal */}
      <AddBrandModal
        isModalOpen={addBrandModal}
        setModalOpen={setAddBrandModal}
      />

      {/* Delete Brand Modal */}
      <DeleteBrandModal
        isModalOpen={deleteBrandModal}
        setModalOpen={setDeleteBrandModal}
        brandId={selectedBrandId}
      />
    </>
  )
}

export default BrandsTable
