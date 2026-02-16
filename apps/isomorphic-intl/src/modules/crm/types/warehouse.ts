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

export interface WarehouseQueryOptions extends QueryOptions {
  name?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface WarehouseList {
  id: string
  name: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface WarehouseUpdate {
  id: string
  data: []
}

export interface WarehouseCreateFormTypes {
  name: string
}

export interface WarehouseEditFormTypes {
  name: string
}

export interface WarehouseEditFormProps {
  warehouseData?: WarehouseEditFormTypes
  id?: string
  name?: string
}

export interface WarehouseEditComponentProps {
  id: string
  name?: string
}

export interface WarehousePaginator extends PaginatorInfo<WarehouseList> {}
