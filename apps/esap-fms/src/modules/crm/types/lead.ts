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

export interface LeadQueryOptions extends QueryOptions {
  name?: string
  title?: string
  email?: string
  phone?: string
  company?: string
  region?: string
  industry?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface LeadList {
  id: any
  firstName: string
  email: string
  phone: string
  address: string
  company: string
  shortOrder?: string
  owner: string
  region: string
  lastName: string
  feedback: string
  industry: string
  title: string
  leadStatus?: string
  description: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface LeadImportData {
  file?: string
}

export interface LeadUpdate {
  id: string
  data: []
}

export interface LeadCreateFormTypes {
  firstName: string
  email: string
  phone: string
  address?: string
  company?: string
  assignedTo?: string
  region?: string
  feedback?: string
  industry?: string
  title?: string
  leadStatus?: string
  description?: string
  status?: string
}

export interface LeadEditFormTypes {
  campaignId?: string
  id?: string
  firstName: string
  lastName?: string
  email: string
  phone: string
  address?: string
  company?: string
  owner?: string
  region?: string
  feedback?: any
  cost?: number
  rating?: number
  industry?: any
  title?: string
  customerId?: string
  leadStatus?: any
  description?: string
  status?: string
  fax?: string
  leadSource?: string
  website?: string
  noOfEmployees?: number
  annualRevenue?: number
  skypeId?: string
  secondaryEmail?: string
  twitter?: string
}

export interface LeadEditFormProps {
  id: string
  LeadData: LeadEditFormTypes
}

export interface LeadEditComponentProps {
  id: string
}

export interface LeadDetailsComponentProps {
  id: string
}

export interface LeadCreationFormTypes {
  firstName: string
  email: string
  phone: string
  address?: string
  company?: string
  assignedTo?: string
  region?: string
  fax?: string
  countryId?: string
  feedback?: string
  industry?: string
  title?: string
  cost?: number
  leadStatus?: string
  description?: string
  status?: string
  street?: string
  house?: string
  state?: string
  zip?: number
  city?: number
}

export interface LeadFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Lead {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  cost?: number
  city?: string
  street?: string
  company?: string
  assignedTo?: string
  owner?: string
  leadSource?: string
  rating?: number
  feedback?: string
  industry?: string
  countryId?: string
  title?: string
  annualRevenue?: number
  description?: string
  shortOrder?: number
  status?: any
  createdBy?: any
  action?: string
  house?: string
  zip?: string
  state?: string
  campaignDetails?: CampaignDetail[]
}

export type CampaignDetail = {
  id?: any
  campaignId?: string
  deadline?: string
  service?: string
  source?: string
}

export interface LeadEditComponentProps {
  id: string
}

export interface LeadPaginator extends PaginatorInfo<LeadList> {}
