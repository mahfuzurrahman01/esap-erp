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

export interface CategoryQueryOptions extends QueryOptions {
  name?: string
  parentCategory?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface CategoryList {
  id: any
  parentCategoryId: string
  parentCategory: { name: string }
  parentCategoryName: string
  createdBy: string
  name: string
  shortOrder?: string
  count: number
  pageSize: string
  status: string
  action: string
  data: Category[]
}

export interface CategoryUpdate {
  id: string
  data: []
}

export interface CategoryCreateFormTypes {
  name: string
  parentCategoryId?: string
}

export interface CategoryEditFormTypes {
  name: string
  parentCategoryId?: string
  status?: string
}

export interface CategoryEditFormProps {
  categoryData?: CategoryEditFormTypes
  id?: string
  name?: string
}

export interface CategoryEditComponentProps {
  id: string
}

export interface CategoryDetailsComponentProps {
  id: string
  name?: string
}

export interface Category {
  id: string
  name: string
  parentCategoryId: string
  parentCategoryName: string
  parentCategory: { name: string }
  status?: string
  action: string
}

export interface CategoryPaginator extends PaginatorInfo<CategoryList> {}
