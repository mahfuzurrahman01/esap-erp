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

export interface OpportunityQueryOptions extends QueryOptions {
  lead?: string
  customer?: string
  amount?: string
  closingDate?: string
  probability?: string
  type?: string
  stage?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface OpportunityList {
  id: any
  name: string
  leadId: string
  customerId: string
  closingDate: string
  amount: string
  probability: string
  type: string
  shortOrder?: string
  description: string
  lead: { title: string }
  primaryContact?: string
  opportunityOwner?: string
  stage: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface OpportunityUpdate {
  id: string
  data: []
}

export interface OpportunityCreateFormTypes {
  leadId: string
  customerId: string
  closingDate: string
  amount: number
  probability: number
  type: string
  description: string
  primaryContact?: string
  stage: string
  action?: string
  status: string
}

export interface OpportunityEditFormTypes {
  id?: number
  leadId?: string
  customerId?: string
  closingDate?: string
  amount?: number
  probability?: number
  type?: string
  description?: string
  primaryContact?: string
  stage?: string
  action?: string
  status?: string
  dealOwner?: string;
  name?: string;
  leadSource?: string;
  campaignId?: string;
  nextStep?: string;
  forecastedRevenue?: number;
}

export interface OpportunityEditFormProps {
  id: string
  OpportunityData: OpportunityEditFormTypes
}

export interface OpportunityEditComponentProps {
  id: string
}

export interface OpportunityDetailsComponentProps {
  id: string
  name?: string
}

export interface OpportunityCreationFormTypes {
  id?: number
  leadId?: string
  customerId?: string
  closingDate?: string
  amount?: number
  probability?: number
  type?: string
  description?: string
  primaryContact?: string
  stage?: string
  action?: string
  status?: string
}

export interface OpportunityFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Opportunity {
  id?: any
  leadId?: string
  lead: { title: string; email: string}
  customerId: string
  closingDate: string
  amount?: number
  forecastedRevenue?: number
  shortOrder?: number
  probability?: number
  dealOwner?: string
  leadSource?: string
  dealName?: string
  name: string
  campaignId: string
  type: string
  description: string
  primaryContact?: string
  opportunityOwner?: string
  stage: string
  action?: string
  status: string
}

export interface OpportunityEditComponentProps {
  id: string
}

export interface OpportunityPaginator extends PaginatorInfo<OpportunityList> {}
