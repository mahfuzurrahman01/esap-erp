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

export interface StockQueryOptions extends QueryOptions {
  product?: string
  warehouse?: string
  quantity?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface StockList {
  id: any
  productId: string
  productName?: string
  warehouseId: string
  warehouseName: string
  stockQuantity: number
  shortOrder?: number
  createdBy?: string
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface StockUpdate {
  id: string
  data: []
}

export interface StockCreateFormTypes {
  productId: string
  stockQuantity: number
  warehouseId: number
}

export interface StockEditFormTypes {
  id?: string
  productId?: string
  stockQuantity: number
  warehouseId?: string
}

export interface Stock {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  stockQuantity: number
  action: string
}

export interface StockEditFormProps {
  stockData?: StockEditFormTypes
  id?: string
  productId?: string
  stockQuantity?: number
  warehouse?: string
}

export interface StockEditComponentProps {
  id: string
}

export interface StockDetailsComponentProps {
  id: string
  productId: string
  stockQuantity: number
  warehouse: string
}

export interface StockPaginator extends PaginatorInfo<StockList> {}
