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

export interface CampaignReportQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  startDate?: string
  endDate?: string
}

export interface CampaignReportList {
  id: any
  sl?: string
  status: string
  clientCompany?: string
  CampaignYear?: string
  volume?: string
  saleValue?: string
  numberOfCampaign?: string
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

export interface CampaignReportUpdate {
  id: string
  data: []
}

export interface CampaignReportCreateFormTypes {
  productId: string
  CampaignReportQuantity: number
  warehouseId: string
}

export interface CampaignReportEditFormTypes {
  id?: string
  productId?: string
  CampaignReportQuantity: number
  warehouseId?: string
}

export interface CampaignReport {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  CampaignReportQuantity: number
  action: string
}

export interface CampaignReportEditFormProps {
  CampaignReportData?: CampaignReportEditFormTypes
  id?: string
  productId?: string
  CampaignReportQuantity?: number
  warehouse?: string
}

export interface CampaignReportEditComponentProps {
  id: string
}

export interface CampaignReportDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface CampaignReportPaginator
  extends PaginatorInfo<CampaignReportList> {}
