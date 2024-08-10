import { DataTable } from '@/components/table'
import { usersColumns } from './columns'
import { getUsers } from '@/server/data/users'
import { User } from '@/lib/dataTypes'
import { Input } from '@/components/input'

const UsersPage = async () => {
  const users: User[] = await getUsers()

  return (
    <>
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="flex justify-between items-center flex-wrap gap-3 py-5 px-6">
          <h2 className="text-2xl font-medium">Users</h2>
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
