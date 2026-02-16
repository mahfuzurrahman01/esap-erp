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

export interface SalesReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface SalesReportList {
  id: any
  sl?: string
  status: string
  salesMonthName?: string
  salesYear?: string
  volume?: string
  saleValue?: string
  numberOfSales?: string
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

export interface SalesReportUpdate {
  id: string
  data: []
}

export interface SalesReportCreateFormTypes {
  productId: string
  SalesReportQuantity: number
  warehouseId: string
}

export interface SalesReportEditFormTypes {
  id?: string
  productId?: string
  SalesReportQuantity: number
  warehouseId?: string
}

export interface SalesReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  SalesReportQuantity: number
  action: string
}

export interface SalesReportEditFormProps {
  SalesReportData?: SalesReportEditFormTypes
  id?: string
  productId?: string
  SalesReportQuantity?: number
  warehouse?: string
}

export interface SalesReportEditComponentProps {
  id: string
}

export interface SalesReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface SalesReportPaginator extends PaginatorInfo<SalesReportList> {}
