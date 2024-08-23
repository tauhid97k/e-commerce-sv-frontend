import { getUsers } from '@/server/data/users'
import UsersTable from './table'

const UsersPage = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string
    search?: string
    status?: string
  }
}) => {
  const page = searchParams?.page || 1
  const search = searchParams?.search || ''
  const status = searchParams?.status || ''

  const queries = `page=${page}&search=${search}&status=${status}`
  const users = await getUsers(queries)

  return <UsersTable users={users} />
}

export default UsersPage
