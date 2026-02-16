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

export interface MessageQueryOptions extends QueryOptions {
  id?: string
  title?: string
  messageDate?: string
  relatedTo?: string
  location?: string
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

export interface MessageList {
  id: any
  name?: string
  messageDetails: any
  repeatDate?: string
  customerId?: string
  repeatTime?: string
  messageTime?: string
  relatedTo?: string
  createdBy?: string
  description?: string
  participant?: string
  participateType?: string
  location?: string
  shortOrder?: string
  online?: boolean
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface MessageUpdate {
  id: string
  data: []
}

export interface MessageCreateFormTypes {
  name: string
  parent_id: string
}

export interface MessageEditFormTypes {
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

export interface MessageEditFormProps {
  id: string
  MessageData: MessageEditFormTypes
}

export interface MessageEditComponentProps {
  id: string
}

export interface MessageDetailsComponentProps {
  id: string
  name: string
}

export interface MessageCreationFormTypes {
  title?: string
  messageDate?: string
  repeatDate?: string
  repeatTime?: string
  messageTime?: string
  relatedTo?: string
  description?: string
  participant?: string[]
  participateType?: string
  location?: string
  repeat?: boolean
  reminder?: boolean
}

export interface MessageFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Message {
  id?: string
  title?: string
  messageDate?: string
  repeatDate?: string
  repeatTime?: string
  messageTime?: string
  relatedTo?: string
  description?: string
  participant?: string[]
  participateType?: string
  location?: string
  repeat?: boolean
  reminder?: boolean
  action: string
  status: string
}

export interface MessageEditComponentProps {
  id: string
}

export interface MessagePaginator extends PaginatorInfo<MessageList> {}
