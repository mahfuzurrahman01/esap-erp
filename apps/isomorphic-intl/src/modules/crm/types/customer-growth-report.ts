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

export interface CustomerGrowthReportQueryOptions extends QueryOptions {
  year?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface CustomerGrowthReportList {
  id: any
  sl?: string
  status: string
  clientCompany?: string
  totalCustomers?: string
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

export interface CustomerGrowthReportUpdate {
  id: string
  data: []
}

export interface CustomerGrowthReportCreateFormTypes {
  productId: string
  CustomerGrowthReportQuantity: number
  warehouseId: string
}

export interface CustomerGrowthReportEditFormTypes {
  id?: string
  productId?: string
  CustomerGrowthReportQuantity: number
  warehouseId?: string
}

export interface CustomerGrowthReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  CustomerGrowthReportQuantity: number
  action: string
}

export interface CustomerGrowthReportEditFormProps {
  CustomerGrowthReportData?: CustomerGrowthReportEditFormTypes
  id?: string
  productId?: string
  CustomerGrowthReportQuantity?: number
  warehouse?: string
}

export interface CustomerGrowthReportEditComponentProps {
  id: string
}

export interface CustomerGrowthReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface CustomerGrowthReportPaginator
  extends PaginatorInfo<CustomerGrowthReportList> {}
