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

export interface NotificationQueryOptions extends QueryOptions {
  title?: string
  notificationDate?: string
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

export interface NotificationList {
  id: any
  name?: string
  NotificationDetails: any
  repeatDate?: string
  repeatTime?: string
  unRead?: string
  relatedTo?: string
  description?: string
  icon?: string
  createdAt?: string
  location?: string
  shortOrder?: string
  online?: boolean
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface NotificationUpdate {
  id: string
  data: []
}

export interface NotificationCreateFormTypes {
  name: string
  parent_id: string
}

export interface NotificationEditFormTypes {
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

export interface NotificationEditFormProps {
  id: string
  NotificationData: NotificationEditFormTypes
}

export interface NotificationEditComponentProps {
  id: string
}

export interface NotificationDetailsComponentProps {
  id: string
  name: string
}

export interface NotificationCreationFormTypes {
  title?: string
  notificationDate?: string
  repeatDate?: string
  repeatTime?: string
  NotificationTime?: string
  relatedTo?: string
  description?: string
  participant?: string[]
  participateType?: string
  location?: string
  repeat?: boolean
  reminder?: boolean
}

export interface NotificationFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Notification {
  id?: string
  title?: string
  notificationDate?: string
  repeatDate?: string
  repeatTime?: string
  NotificationTime?: string
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

export interface NotificationEditComponentProps {
  id: string
}

export interface NotificationPaginator
  extends PaginatorInfo<NotificationList> {}
