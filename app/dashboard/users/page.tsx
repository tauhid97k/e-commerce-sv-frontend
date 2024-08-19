import { getUsers } from '@/server/data/users'
import UsersTable from './table'

const UsersPage = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string
    search?: string
  }
}) => {
  const page = searchParams?.page || 1
  const search = searchParams?.search || ''

  const queries = `page=${page}&search=${search}`
  const users = await getUsers(queries)

  return <UsersTable users={users} queries={queries} />
}

export default UsersPage
