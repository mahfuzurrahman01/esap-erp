export interface PaginatorInfo<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: any[]
  next_page_url: string | null
  path: string
  pageIndex: number
  pageSize: number
  prev_page_url: string | null
  to: number
  count: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface ProductQueryOptions extends QueryOptions {
  name?: string
  actualPrice?: string
  salePrice?: string
  category?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  page?: number
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface ProductList {
  id: any
  productName: string
  productPicturePath: string
  actualPrice: string
  salePrice: string
  categoryName: string
  user_id: string
  status: string
  count: number
  pageSize: string
  action: string
  createdBy: string
  shortOrder?: string
  approvalStatus?: string
  attributeNames: string
  data: []
}

export interface ProductUpdate {
  id: string
  data: []
}

export interface ProductCreateFormTypes {
  productName: string
  parent_id: string
}

export interface ProductEditFormTypes {
  id: string
  name?: string
  description?: string
  code?: string
  actualPrice?: number
  salePrice?: number
  categoryId?: string
  unit?: string
  attributeIds?: any
  brand?: string
  thumbnail?: FileList
}

export interface ProductEditFormProps {
  id: string
  productData: ProductEditFormTypes
}

export interface ProductEditComponentProps {
  id: string
}

export interface ProductDetailsComponentProps {
  id: string
  productName: string
}

export interface ProductCreationFormTypes {
  name: string
  description?: string
  code: string
  actualPrice: number
  unitCost: number
  salePrice?: number
  categoryId: string
  size?: string
  attributeIds?: any
  vat?: number
  discount?: number
  productPicture?: File | String
  thumbnail?: FileList
}

export interface ProductFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface ProductView {
  id: number
  name: string
  code: string
  productPicturePath: string
  unitCost?: number
  tax?: number
  discount?: number
  actualPrice: string
  salePrice: string
  categoryName: string
  attributeNames: string[]
  category: { productName: string }
  brandproductName: string
  size: string
  user_id: string
  action: string
  status: string
}

export interface Product {
  id: number
  productName: string
  productPicturePath: string
  actualPrice: string
  salePrice: string
  category: { productName: string }
  brandproductName: string
  size: string
  user_id: string
  action: string
  status: string
}

export interface ProductEditComponentProps {
  id: string
}

export interface ProductPaginator extends PaginatorInfo<ProductList> {}
