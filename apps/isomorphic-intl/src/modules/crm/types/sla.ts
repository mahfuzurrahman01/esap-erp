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

export interface SlaQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface SlaList {
  id: any
  status: string
  name?: string
  responseTime: string
  resolutionTime?: string
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface SlaUpdate {
  id: string
  data: []
}

export interface SlaCreateFormTypes {
  productId: string
  SlaQuantity: number
  warehouseId: string
}

export interface SlaEditFormTypes {
  id?: string
  productId?: string
  SlaQuantity: number
  warehouseId?: string
}

export interface Sla {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  SlaQuantity: number
  action: string
}

export interface SlaEditFormProps {
  SlaData?: SlaEditFormTypes
  id?: string
  productId?: string
  SlaQuantity?: number
  warehouse?: string
}

export interface SlaEditComponentProps {
  id: string
}

export interface SlaDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface SlaPaginator extends PaginatorInfo<SlaList> {}
