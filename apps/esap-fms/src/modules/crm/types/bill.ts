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

export interface BillQueryOptions extends QueryOptions {
  category?: string
  type?: string
  amount?: string
  paymentMethod?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface BillList {
  id: any
  invoiceNo: string
  incomeCategory: string
  customerId?: string
  customer?: {
    firstName: string
    lastName: string
  } | null
  paymentMethod: string
  amount: string
  probability: string
  type: string
  shortOrder?: string
  description: string
  stage: string
  approvalStatus?: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface BillUpdate {
  id: string
  data: []
}

export interface BillCreateFormTypes {
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

export interface BillEditFormTypes {
  id?: number
  invoiceId?: string
  incomeCategory?: string
  type?: string
  amount?: number
  issueDate?: string
  customerId?: string
  description?: string
  paymentMethod?: string
  chartOfAccountId?: number
  file?: File | null | undefined
  note?: string
  action?: string
  status?: string
}

export interface BillEditFormProps {
  id: string
  BillData: BillEditFormTypes
}

export interface BillEditComponentProps {
  id: string
}

export interface BillDetailsComponentProps {
  id: string
  name?: string
}

export interface BillCreationFormTypes {
  id?: number
  incomeCategory?: string
  customerId?: string
  issueDate?: string
  amount?: number
  paymentMethod?: string
  chartOfAccountId?: number
  type?: string
  description?: string
  file?: File | null | undefined
  note?: string
  stage?: string
  action?: string
  status?: string
}

export interface BillFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Bill {
  id?: any
  shortOrder?: number
  leadId?: string
  lead: { title: string }
  customer?: { firstName: string }
  incomeCategory?: string
  paymentMethod?: string
  issueDate?: string
  customerId: string
  closingDate: string
  amount?: number
  probability?: number
  type: string
  note?: string
  description: string
  primaryContact?: string
  filePath?: File | null | undefined
  stage: string
  action?: string
  status: string
}

export interface BillEditComponentProps {
  id: string
}

export interface BillPaginator extends PaginatorInfo<BillList> {}
