// Pagination Link Interface
interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

// Meta Data Interface
interface Meta {
  links: PaginationLink[]
  current_page: number
  last_page: number
  total: number
}

// Paginated Data and Meta Type
export type PaginatedData<TData> = {
  data: TData[] // Actual data array
  meta: Meta // Meta information including pagination links
}

// User
export type User = {
  id: number
  name: string
  email: string
  emailVerifiedAt: Date
  role: string
  permissions: string[]
  status: string
  createdAt: Date
  updatedAt: Date
}

// Category
export type Category = {
  id: number
  name: string
  parentCategoryName: string
  slug: string
  description: string | null
  isVisible: boolean
  seoTitle: string | null
  seoDescription: string | null
  createdAt: string
  updatedAt: string
}
