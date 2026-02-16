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

export interface DashboardReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface DashboardReportList {
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

export interface DashboardReportUpdate {
  id: string
  data: []
}

export interface DashboardReportCreateFormTypes {
  productId: string
  DashboardReportQuantity: number
  warehouseId: string
}

export interface DashboardReportEditFormTypes {
  id?: string
  productId?: string
  DashboardReportQuantity: number
  warehouseId?: string
}

export interface DashboardReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  DashboardReportQuantity: number
  action: string
}

export interface DashboardReportEditFormProps {
  DashboardReportData?: DashboardReportEditFormTypes
  id?: string
  productId?: string
  DashboardReportQuantity?: number
  warehouse?: string
}

export interface DashboardReportEditComponentProps {
  id: string
}

export interface DashboardReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface DashboardReportPaginator
  extends PaginatorInfo<DashboardReportList> {}
