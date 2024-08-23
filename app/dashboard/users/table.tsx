'use client'

import { Button } from '@/components/button'
import { Plus } from 'lucide-react'
import { Input } from '@/components/input'
import { DataTable } from '@/components/table'
import { PaginatedData, User } from '@/lib/dataTypes'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounceCallback } from 'usehooks-ts'
import { CheckSelector } from '@/components/filters/check-selector'

const UsersTable = ({ users }: { users: PaginatedData<User> }) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()

  // Users Table Columns
  const columns: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Verified At',
      accessorKey: 'emailVerifiedAt',
    },
    {
      header: 'Joining Date',
      accessorKey: 'createdAt',
    },
    {
      header: 'Last Update',
      accessorKey: 'updatedAt',
    },
  ]

  // Status Filters
  const statusFilterOptions = [
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Inactive',
      value: 'inactive',
    },
    {
      label: 'Suspended',
      value: 'suspended',
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
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="py-6 px-6">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <h2 className="text-3xl text-dark-200">Users</h2>
          <Button>
            <Plus className="icon" />
            <span>Add User</span>
          </Button>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <Input
            type="search"
            name="search"
            defaultValue={params.get('search')?.toString()}
            onChange={handleSearch}
            placeholder="Search name or email..."
            className="sm:w-72"
          />
          <CheckSelector filter="status" options={statusFilterOptions} />
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
  )
}

export default UsersTable
