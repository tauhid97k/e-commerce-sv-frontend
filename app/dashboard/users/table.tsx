'use client'

import { Input } from '@/components/input'
import { DataTable } from '@/components/table'
import { PaginatedData, User } from '@/lib/dataTypes'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const UsersTable = ({
  users,
  queries,
}: {
  users: PaginatedData<User>
  queries: string
}) => {
  const [isPending, startTransition] = useTransition()
  const searchParams = new URLSearchParams(queries)
  const router = useRouter()

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

  // Handle Search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value

    if (searchValue) {
      searchParams.set('search', searchValue)
      searchParams.set('page', '1')
    } else {
      searchParams.delete('search')
      searchParams.delete('page')
    }

    startTransition(() => {
      router.push(`?${searchParams}`)
    })
  }

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <div className="flex justify-between items-center flex-wrap gap-3 py-5 px-6">
        <h2 className="text-2xl text-dark-200">Users</h2>
        <Input
          type="search"
          name="search"
          defaultValue={searchParams.get('search')?.toString()}
          onChange={handleSearch}
          placeholder="Search name or email..."
          className="w-full sm:w-72"
        />
      </div>
      <DataTable data={users} columns={columns} />
    </div>
  )
}

export default UsersTable
