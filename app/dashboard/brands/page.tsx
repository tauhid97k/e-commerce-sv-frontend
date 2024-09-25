import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getBrands } from '@/actions/brands'
import { getQueryClient } from '@/lib/query-client'
import BrandsTable from './table'

const BrandsPage = ({
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
    queryKey: ['brands', queries],
    queryFn: () => getBrands(queries),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandsTable queries={queries} />
    </HydrationBoundary>
  )
}

export default BrandsPage
