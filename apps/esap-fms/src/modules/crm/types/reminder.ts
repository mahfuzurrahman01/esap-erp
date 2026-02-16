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

export interface ReminderQueryOptions extends QueryOptions {
  task?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface ReminderList {
  id: any
  status: string
  name?: string
  type: string
  taskId?: string
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface ReminderUpdate {
  id: string
  data: []
}

export interface ReminderCreateFormTypes {
  productId: string
  ReminderQuantity: number
  warehouseId: string
}

export interface ReminderEditFormTypes {
  id?: string
  productId?: string
  ReminderQuantity: number
  warehouseId?: string
}

export interface Reminder {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  ReminderQuantity: number
  action: string
}

export interface ReminderEditFormProps {
  ReminderData?: ReminderEditFormTypes
  id?: string
  productId?: string
  ReminderQuantity?: number
  warehouse?: string
}

export interface ReminderEditComponentProps {
  id: string
}

export interface ReminderDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface ReminderPaginator extends PaginatorInfo<ReminderList> {}
