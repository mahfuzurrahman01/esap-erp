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

export interface AttributeQueryOptions extends QueryOptions {
  name?: string
  values?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface AttributeList {
  id: any
  attributeValues: []
  values?: []
  shortOrder?: string
  createdBy?: string
  createdAt: string
  name: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface AttributeUpdate {
  id: string
  data: []
}

export interface AttributeCreateFormTypes {
  name: string
}

export interface AttributeEditFormTypes {
  name?: string
  values?: string[]
  attributeValue?: string[]
}

export interface AttributeEditFormProps {
  attributeData?: AttributeEditFormTypes
  id?: string
  name?: string
}

export interface AttributeEditComponentProps {
  id: string
}

export interface AttributeDetailsComponentProps {
  id: string
  name: string
}

export interface Attribute {
  id: string
  name: string
  createdAt: string
  attributeValues: string[]
  values?: []
  action: string
}

export interface AttributePaginator extends PaginatorInfo<AttributeList> {}
