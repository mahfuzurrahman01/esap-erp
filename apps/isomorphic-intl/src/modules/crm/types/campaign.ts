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
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface CampaignQueryOptions extends QueryOptions {
  subject?: string
  deadLine?: string
  company?: string
  service?: string
  source?: string
  type?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface CampaignList {
  id: any
  subject: string
  company: string
  service: string
  deadline: string
  endDate?: string
  description: string
  primaryContact: string
  source: string
  type: string
  shortOrder?: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface CampaignUpdate {
  id: string
  data: []
}

export interface CampaignCreateFormTypes {
  name: string
  parent_id: string
}

export interface CampaignEditFormTypes {
  id: string
  name?: string
  description?: string
  code?: string
  actualPrice?: number
  salePrice?: number
  category?: string
  unit?: string
  attributes?: any
  brand?: string
  thumbnail?: FileList
}

export interface CampaignEditFormProps {
  id: string
  CampaignData: CampaignEditFormTypes
}

export interface CampaignEditComponentProps {
  id: string
}

export interface CampaignDetailsComponentProps {
  id: string
  name: string
}

export interface CampaignCreationFormTypes {
  subject: string
  deadline?: string
  company: string
  service: string
  description?: string
  primaryContact?: string
  source?: string
  type?: string
  status?: string
}

export interface CampaignFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Campaign {
  id?: string
  shortOrder?: number
  subject: string
  deadline: string
  company: string
  service: string
  description: string
  primaryContact: string
  source: string
  type: string
  attachment?: File | null | undefined
  action: string
  status: string
  leadDetails?: LeadDetail[]
}

export type LeadDetail = {
  id?: any
  leadId?: string
  company?: string
  email?: string
  phone?: string
}

export type OpportunityDetail = {
  id?: any
  opportunityId?: string
  name?: string
  closingDate?: string
  amount?: string
  probability?: string
}

export interface CampaignEditComponentProps {
  id: string
}

export interface CampaignPaginator extends PaginatorInfo<CampaignList> {}
