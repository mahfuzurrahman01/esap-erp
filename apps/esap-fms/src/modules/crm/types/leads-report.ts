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

export interface LeadsReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface LeadsByCompany {
  id: any
  sl?: string
  status: string
  clientCompany?: string
  year?: string
  month?: string
  saleValue?: string
  numbersOfLead?: string
  quarter?: string
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

export interface LeadsByStatusTypes {
  id: any
  sl?: string
  status: string
  leadStatus?: string
  leadStatusCount?: string
  leadName?: string
  company?: string
  firstName?: string
  quarter?: string
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

export interface LeadsReportUpdate {
  id: string
  data: []
}

export interface LeadsReportCreateFormTypes {
  productId: string
  LeadsReportQuantity: number
  warehouseId: string
}

export interface LeadsReportEditFormTypes {
  id?: string
  productId?: string
  LeadsReportQuantity: number
  warehouseId?: string
}

export interface LeadsReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  LeadsReportQuantity: number
  action: string
}

export interface LeadsReportEditFormProps {
  LeadsReportData?: LeadsReportEditFormTypes
  id?: string
  productId?: string
  LeadsReportQuantity?: number
  warehouse?: string
}

export interface LeadsReportEditComponentProps {
  id: string
}

export interface LeadsReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface LeadsReportPaginator extends PaginatorInfo<LeadsByCompany> {}
