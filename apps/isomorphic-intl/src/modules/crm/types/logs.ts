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
  total: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface LogsQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface LogsList {
  id: any
  status: string
  userId?: string
  message?: string
  actionName: string
  ipAddress?: string
  timestamp?: string
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface LogsUpdate {
  id: string
  data: []
}

export interface LogsCreateFormTypes {
  productId: string
  LogsQuantity: number
  warehouseId: string
}

export interface LogsEditFormTypes {
  id?: string
  productId?: string
  LogsQuantity: number
  warehouseId?: string
}

export interface Logs {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  LogsQuantity: number
  action: string
}

export interface LogsEditFormProps {
  LogsData?: LogsEditFormTypes
  id?: string
  productId?: string
  LogsQuantity?: number
  warehouse?: string
}

export interface LogsEditComponentProps {
  id: string
}

export interface LogsDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface LogsPaginator extends PaginatorInfo<LogsList> {}
