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

export interface TaskQueryOptions extends QueryOptions {
  subject?: string
  ticket?: string
  company?: string
  description?: string
  priority?: string
  ticketId?: string
  startDate?: string
  dueDate?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface TaskList {
  id: any
  subject?: string
  type?: string
  ticketId?: string
  assignedTo?: string
  priority?: string
  startDate?: string
  dueDate?: string
  shortOrder?: number
  repeatDate?: string
  file?: File | null | undefined
  description?: string
  assignedToName?: string
  status?: string
  reminder?: boolean
  count: number
  pageSize: string
  assignedToPhotopath?: string
  action: string
  data: []
  ticketSubject?: string
}

export interface TaskUpdate {
  id: string
  data: []
}

export interface TaskCreateFormTypes {
  name: string
  parent_id: string
}

export interface TaskEditFormTypes {
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

export interface TaskEditFormProps {
  id: string
  TaskData: TaskEditFormTypes
}

export interface TaskEditComponentProps {
  id: string
}

export interface TaskDetailsComponentProps {
  id: string
  name: string
}

export interface SendMailFormTypes {
  to?: string
  subject?: string
  body?: string
}

export interface TaskCreationFormTypes {
  subject?: string
  type?: string
  ticketId?: string
  assignedTo?: string
  priority?: string
  startDate?: string
  dueDate?: string
  repeatDate?: string
  file?: File | null | undefined
  description?: string
  status?: string
  reminder?: boolean
  campaignId?: string
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
}

export interface TaskFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Task {
  id?: string
  subject?: string
  type?: string
  ticketId?: string
  assignedTo?: string
  priority?: string
  startDate?: string
  shortOrder?: number
  dueDate?: string
  repeatDate?: string
  file?: File | null | undefined
  filePath?: File | null | undefined
  description?: string
  status?: string
  action: string
  campaignId?: string
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
  ticket?: {
    subject: string
  }
}

export interface TaskEditComponentProps {
  id: string
}

export interface TaskPaginator extends PaginatorInfo<TaskList> {}
