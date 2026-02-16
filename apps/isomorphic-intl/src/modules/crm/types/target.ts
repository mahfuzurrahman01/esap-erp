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

export interface TargetQueryOptions extends QueryOptions {
  title?: string
  type?: string
  targetValue?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface TargetList {
  id: any
  title: string
  type: string
  targetValue: string
  quarter: string
  month: string
  year: string
  shortOrder?: string
  approvalStatus?: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface TargetUpdate {
  id: string
  data: []
}

export interface TargetCreateFormTypes {
  name: string
  parent_id: string
}

export interface TargetEditFormTypes {
  id?: any
  title?: string
  type?: string
  month?: string
  year?: string
  quarter?: string
  targetValue?: number
  status?: string
}

export interface TargetEditFormProps {
  id: string
  TargetData: TargetEditFormTypes
}

export interface TargetEditComponentProps {
  id: string
}

export interface TargetDetailsComponentProps {
  id: string
  name: string
}

export interface TargetFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Target {
  id?: string
  subject: string
  title?: string
  month?: string
  targetValue?: number
  shortOrder?: number
  quarter?: string
  company: string
  service: string
  createdBy: string
  primaryContact: string
  source: string
  type: string
  action: string
  status: string
}

export interface TargetEditComponentProps {
  id: string
}

export interface TargetPaginator extends PaginatorInfo<TargetList> {}
