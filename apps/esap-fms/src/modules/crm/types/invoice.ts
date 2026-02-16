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

export interface InvoiceQueryOptions extends QueryOptions {
  name?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface InvoiceList {
  id?: any
  subject: string
  deadline: string
  company: string
  service: string
  source: string
  invoice_date: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type: string
  description: string
  stage: string
  prefix: string
  expiry_date: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface InvoiceUpdate {
  id: string
  data: []
}

export interface InvoiceCreateFormTypes {
  quotation_id: string
  customer_id: string
  Invoice_no: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type?: string
  description: string
  stage: string
  prefix: string
  expiry_date: string
  status: string
  action?: string
}

export interface InvoiceEditFormTypes {
  id?: string
  quotation: string
  customer: string
  Invoice_no: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type?: string
  courier?: string
  description: string
  stage: string
  Invoice_prefix: string
  expiry_date: string
  stages?: string
  action?: string
  status: string
}

export interface InvoiceEditFormProps {
  id: string
  InvoiceData: InvoiceEditFormTypes
}

export interface InvoiceEditComponentProps {
  id: string
}

export interface InvoiceDetailsComponentProps {
  id: string
  name?: string
}

export interface InvoiceCreationFormTypes {
  id?: string
  lead_id: string
  customer_id: string
  close_date: string
  amount: string
  probability: string
  type: string
  description: string
  stage: string
  action?: string
  status: string
}

export interface InvoiceFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Invoice {
  id?: string
  quotation: string
  customer: string
  salesorder_no: string
  invoice_no: string
  invoice_date: string
  payment_method: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type: string
  income_category: string
  amount: string
  prefix: string
  expiry_date: string
  action?: string
  created_at?: string
  status: string
}

export interface InvoiceEditComponentProps {
  id: string
}

export interface InvoicePaginator extends PaginatorInfo<InvoiceList> {}
