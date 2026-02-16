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

export interface TicketsReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface TicketsReportList {
  id: any
  sl?: string
  status: string
  numberOfTask?: string
  numberOfTicket?: string
  month?: string
  quarter?: string
  year?: string
  tax?: string
  discount?: string
  cost?: string
  profit?: string
  revenue?: string
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface TicketsReportUpdate {
  id: string
  data: []
}

export interface TicketsReportCreateFormTypes {
  productId: string
  TicketsReportQuantity: number
  warehouseId: string
}

export interface TicketsReportEditFormTypes {
  id?: string
  productId?: string
  TicketsReportQuantity: number
  warehouseId?: string
}

export interface TicketsReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  TicketsReportQuantity: number
  action: string
}

export interface TicketsReportEditFormProps {
  TicketsReportData?: TicketsReportEditFormTypes
  id?: string
  productId?: string
  TicketsReportQuantity?: number
  warehouse?: string
}

export interface TicketsReportEditComponentProps {
  id: string
}

export interface TicketsReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface TicketsReportPaginator
  extends PaginatorInfo<TicketsReportList> {}
