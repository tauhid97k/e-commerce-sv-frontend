'use client'

import { Button, buttonVariants } from '@/components/button'
import { EllipsisVertical, Eye, Pencil, Plus, Trash } from 'lucide-react'
import { Input } from '@/components/input'
import { DataTable } from '@/components/table'
import { PaginatedData, Attribute } from '@/lib/dataTypes'
import { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { useDebounceCallback } from 'usehooks-ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getAttributes } from '@/actions/attributes'
import {
  Dropdown,
  DropdownItem,
  DropdownItems,
  DropdownTrigger,
} from '@/components/dropdown'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import AddAttributeModal from './add-attribute-modal'
import DeleteAttributeModal from './delete-attribute-modal'

const AttributesTable = ({ queries }: { queries: string }) => {
  const [addAttributeModal, setAddAttributeModal] = useState(false)
  const [deleteAttributeModal, setDeleteAttributeModal] = useState(false)
  const [selectedAttributeId, setSelectedAttributeId] = useState<
    number | string
  >('')
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // Get Attributes
  const { data: attributes } = useSuspenseQuery({
    queryKey: ['attributes', queries],
    queryFn: (): Promise<PaginatedData<Attribute>> => getAttributes(queries),
  })

  // Attribute Table Columns
  const columns: ColumnDef<Attribute>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Total values',
      accessorKey: 'totalValues',
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
                    setSelectedAttributeId(id)
                    setDeleteAttributeModal(true)
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

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h2 className="text-2xl text-dark-200">Attributes</h2>
            <Button onClick={() => setAddAttributeModal(true)}>
              <Plus className="icon" />
              <span>Add Attribute</span>
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Input
              type="search"
              name="search"
              defaultValue={params.get('search')?.toString()}
              onChange={handleSearch}
              placeholder="Search attribute name..."
              className="sm:w-72"
            />
          </div>
        </div>
        <DataTable data={attributes} columns={columns} />
      </div>

      {/* Add Attribute Form Modal */}
      <AddAttributeModal
        isModalOpen={addAttributeModal}
        setModalOpen={setAddAttributeModal}
      />

      {/* Delete Attribute Modal */}
      <DeleteAttributeModal
        isModalOpen={deleteAttributeModal}
        setModalOpen={setDeleteAttributeModal}
        attributeId={selectedAttributeId}
      />
    </>
  )
}

export default AttributesTable
