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
  total: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface TicketQueryOptions extends QueryOptions {
  subject?: string
  department?: string
  company?: string
  project?: string
  service?: string
  departmentId?: string | number
  email?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface TicketList {
  id: any
  subject: string
  type: string
  departmentId: string
  mergeTicketId: string
  shortOrder?: string
  service: string
  project: string
  email: string
  createdBy?: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface TicketUpdate {
  id: string
  data: []
}

export interface TicketCreateFormTypes {
  name: string
  parent_id: string
}

export interface TicketEditFormTypes {
  id: string
  name?: string
  email?: string
  code?: string
  actualPrice?: number
  salePrice?: number
  category?: string
  unit?: string
  attributes?: any
  brand?: string
}

export interface TicketEditFormProps {
  id: string
  TicketData: TicketEditFormTypes
}

export interface TicketEditComponentProps {
  id: string
}

export interface TicketDetailsComponentProps {
  id: string
  name: string
}

export interface TicketCreationFormTypes {
  subject?: string
  type?: string
  departmentId?: string
  mergeTicketId?: string
  service?: string
  email?: string
  file?: File | null | undefined
  project?: string
  status?: string
}

export interface TicketFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Ticket {
  id?: string
  subject?: string
  type?: string
  departmentId?: string
  mergeTicketId?: string
  shortOrder?: number
  service?: string
  email?: string
  file?: File | null | undefined
  filePath?: File | null | undefined
  project?: string
  status?: string
  action: string
}

export interface TicketEditComponentProps {
  id: string
}

export interface TicketPaginator extends PaginatorInfo<TicketList> {}
