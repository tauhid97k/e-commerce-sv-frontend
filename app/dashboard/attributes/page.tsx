import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getAttributes } from '@/actions/attributes'
import { getQueryClient } from '@/lib/query-client'
import AttributesTable from './table'

const AttributesPage = ({
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

  // Prefetch Attributes
  queryClient.prefetchQuery({
    queryKey: ['attributes', queries],
    queryFn: () => getAttributes(queries),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttributesTable queries={queries} />
    </HydrationBoundary>
  )
}

export default AttributesPage
