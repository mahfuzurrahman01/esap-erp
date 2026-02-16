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
  total?: number
  count?: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface ContactQueryOptions extends QueryOptions {
  subject?: string
  contactDate?: string
  company?: string
  duration?: string
  relatedTo?: string
  type?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface ContactList {
  id: any
  subject: string
  type: string
  contactDate: string
  contactTime: string
  relatedTo: string
  duration: string
  status: string
  shortOrder?: number
  count?: number
  total?: number
  pageSize: string
  action: string
  data: []
}

export interface ContactUpdate {
  id: string
  data: []
}

export interface ContactCreateFormTypes {
  name: string
  parent_id: string
}

export interface ContactEditFormTypes {
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

export interface ContactEditFormProps {
  id: string
  ContactData: ContactEditFormTypes
}

export interface ContactEditComponentProps {
  id: string
}

export interface ContactDetailsComponentProps {
  id: string
  name: string
}

export interface ContactCreationFormTypes {
  subject?: string
  type?: string
  contactDate?: string
  contactTime?: string
  relatedTo?: string
  description?: string
  file?: string
  duration?: string
  status?: string
  campaignId?: string
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
}

export interface ContactFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Contact {
  id?: string
  subject?: string
  type?: string
  filePath?: File | null | undefined
  contactDate?: string
  contactTime?: string
  relatedTo?: string
  description?: string
  file?: string
  duration?: string
  shortOrder?: number
  status?: string
  action: string
  campaignId?: string
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
}

export interface ContactEditComponentProps {
  id: string
}

export interface ContactPaginator extends PaginatorInfo<ContactList> {}
