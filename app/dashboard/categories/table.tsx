'use client'

import { Button, buttonVariants } from '@/components/button'
import { EllipsisVertical, Eye, Pencil, Plus, Trash } from 'lucide-react'
import { Input } from '@/components/input'
import { DataTable } from '@/components/table'
import { PaginatedData, Category } from '@/lib/dataTypes'
import { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { useDebounceCallback } from 'usehooks-ts'
import { CheckSelector } from '@/components/filters/check-selector'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getCategories } from '@/actions/categories'
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from '@/components/dropdown'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import AddCategoryModal from './add-category-modal'
import DeleteCategoryModal from './delete-category-modal'

const CategoriesTable = ({ queries }: { queries: string }) => {
  const [addCategoryModal, setAddCategoryModal] = useState(false)
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ''
  )
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // Get Categories
  const { data: categories } = useSuspenseQuery({
    queryKey: ['categories', queries],
    queryFn: (): Promise<PaginatedData<Category>> => getCategories(queries),
  })

  // Category Table Columns
  const columns: ColumnDef<Category>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Parent Category',
      accessorKey: 'parentCategoryName',
    },
    {
      header: 'Slug',
      accessorKey: 'slug',
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
                    setSelectedCategoryId(id)
                    setDeleteCategoryModal(true)
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
            <h2 className="text-3xl text-dark-200">Categories</h2>
            <Button onClick={() => setAddCategoryModal(true)}>
              <Plus className="icon" />
              <span>Add Category</span>
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Input
              type="search"
              name="search"
              defaultValue={params.get('search')?.toString()}
              onChange={handleSearch}
              placeholder="Search category name..."
              className="sm:w-72"
            />
            <CheckSelector
              title="Visibility"
              filter="visibility"
              options={visibilityOptions}
            />
          </div>
        </div>
        <DataTable data={categories} columns={columns} />
      </div>

      {/* Add Category Form Modal */}
      <AddCategoryModal
        isModalOpen={addCategoryModal}
        setModalOpen={setAddCategoryModal}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        isModalOpen={deleteCategoryModal}
        setModalOpen={setDeleteCategoryModal}
        categoryId={selectedCategoryId}
      />
    </>
  )
}

export default CategoriesTable
