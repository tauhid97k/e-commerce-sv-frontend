import { DataTable } from '@/components/table'
import { usersColumns } from './columns'
import { getUsers } from '@/server/data/users'
import { Input } from '@/components/input'

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const page = searchParams.page ?? 1
  const limit = searchParams.limit ?? 15

  const queries = `page=${page}&limit=${limit}`
  const users = await getUsers(queries)

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="flex justify-between items-center flex-wrap gap-3 py-5 px-6">
          <h2 className="text-2xl text-dark-200">Users</h2>
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-full sm:w-72"
          />
        </div>
        <DataTable data={users} columns={usersColumns} />
      </div>
    </>
  )
}

export default UsersPage
