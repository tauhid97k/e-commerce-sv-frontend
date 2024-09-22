import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getCategories } from '@/actions/categories'
import { getQueryClient } from '@/lib/query-client'
import CategoriesTable from './table'

const CategoriesPage = ({
  searchParams,
}: {
  searchParams?: {
    page?: string
    search?: string
    visibility?: string
  }
}) => {
  const queryClient = getQueryClient()

  // URL Params
  const page = searchParams?.page || 1
  const search = searchParams?.search || ''
  const visibility = searchParams?.visibility || ''

  const queries = `page=${page}&search=${search}&visibility=${visibility}`

  // Prefetch Users
  queryClient.prefetchQuery({
    queryKey: ['categories', queries],
    queryFn: () => getCategories(queries),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesTable queries={queries} />
    </HydrationBoundary>
  )
}

export default CategoriesPage
