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

export interface OpportunityReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface OpportunityByCompany {
  id?: any
  sl?: any
  stage: string
  stageCount: number
  customerName: string
  closingDate: string
  probability: number
  amount: number
}

export interface OpportunityByStatusTypes {
  id: any
  sl?: string
  status: string
  Opportunitytatus?: string
  OpportunitytatusCount?: string
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

export interface OpportunityReportUpdate {
  id: string
  data: []
}

export interface OpportunityReportCreateFormTypes {
  productId: string
  OpportunityReportQuantity: number
  warehouseId: string
}

export interface OpportunityReportEditFormTypes {
  id?: string
  productId?: string
  OpportunityReportQuantity: number
  warehouseId?: string
}

export interface OpportunityReport {
  sl?: string
  stage: string
  stageCount: number
  customerName: string
  closingDate: string
  probability: number
  amount: number
}

export interface OpportunityReportEditFormProps {
  OpportunityReportData?: OpportunityReportEditFormTypes
  id?: string
  productId?: string
  OpportunityReportQuantity?: number
  warehouse?: string
}

export interface OpportunityReportEditComponentProps {
  id: string
}

export interface OpportunityReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface OpportunityReportPaginator extends PaginatorInfo<OpportunityByCompany> {}
