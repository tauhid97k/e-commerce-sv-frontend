import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getUsers } from '@/actions/users'
import { getQueryClient } from '@/lib/query-client'
import UsersTable from './table'

const UsersPage = ({
  searchParams,
}: {
  searchParams?: {
    page?: string
    search?: string
    status?: string
  }
}) => {
  const queryClient = getQueryClient()

  // URL Params
  const page = searchParams?.page || 1
  const search = searchParams?.search || ''
  const status = searchParams?.status || ''

  const queries = `page=${page}&search=${search}&status=${status}`

  // Prefetch Users
  queryClient.prefetchQuery({
    queryKey: ['users', queries],
    queryFn: () => getUsers(queries),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersTable queries={queries} />
    </HydrationBoundary>
  )
}

export default UsersPage
