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

export interface MonthlyLeadsReportQueryOptions extends QueryOptions {
  year?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface MonthlyLeadsReportList {
  id: any
  sl?: string
  status: string
  clientCompany?: string
  DashboardYear?: string
  volume?: string
  saleValue?: string
  numberOfDashboard?: string
  month?: string
  quarter?: string
  year?: string
  source?: string
  revenue?: string
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface MonthlyLeadsReportUpdate {
  id: string
  data: []
}

export interface MonthlyLeadsReportCreateFormTypes {
  productId: string
  MonthlyLeadsReportQuantity: number
  warehouseId: string
}

export interface MonthlyLeadsReportEditFormTypes {
  id?: string
  productId?: string
  MonthlyLeadsReportQuantity: number
  warehouseId?: string
}

export interface MonthlyLeadsReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  MonthlyLeadsReportQuantity: number
  action: string
}

export interface MonthlyLeadsReportEditFormProps {
  MonthlyLeadsReportData?: MonthlyLeadsReportEditFormTypes
  id?: string
  productId?: string
  MonthlyLeadsReportQuantity?: number
  warehouse?: string
}

export interface MonthlyLeadsReportEditComponentProps {
  id: string
}

export interface MonthlyLeadsReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface MonthlyLeadsReportPaginator
  extends PaginatorInfo<MonthlyLeadsReportList> {}
