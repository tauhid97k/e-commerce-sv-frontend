// Pagination Link Interface
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Meta Data Interface
interface Meta {
  links: PaginationLink[];
  current_page: number;
  last_page: number;
  total: number;
}

// Paginated Data and Meta Type
export type PaginatedData<TData> = {
  data: TData[]; // Actual data array
  meta: Meta; // Meta information including pagination links
};

// User
export type User = {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: Date;
  role: string;
  permissions: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

// Category
export type Category = {
  id: number;
  name: string;
  parentCategoryName: string;
  slug: boolean;
  description: string | null;
  isVisible: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

// Brand
export type Brand = {
  id: number;
  name: string;
  slug: boolean;
  website: string;
  description: string | null;
  isVisible: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
};

// Attribute
export type Attribute = {
  id: number;
  name: string;
  totalValues: number;
  createdAt: string;
  updatedAt: string;
};

// Product
export type Product = {
  id: number;
  name: string;
  slug: string;
  brand?: string;
  totalCategories: number;
  totalVariants: number;
  isNew: boolean;
  isVisible: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Order
export type Order = {
  id: number;
  orderNumber: string;
  totalItems: number;
  totalPrice: number;
  status: string;
  currency: string;
  shippingPrice: number;
  shippingMethod: string;
  note: string;
};

// Review
export type Review = {
  id: number;
  product: string;
  user: string;
  rating: number;
  review: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
};
