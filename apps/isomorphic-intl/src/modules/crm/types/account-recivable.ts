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

export interface AccountRecivableQueryOptions extends QueryOptions {
  name?: string
  AccountRecivableNo?: string
  customerId?: string
  invoiceDateFrom?: string
  customer?: string
  title?: string
  type?: string
  deliveryDateFrom?: string
  courier?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface AccountRecivableList {
  id?: any
  title: string
  quotation: string
  salesOrder?: { id : string, salesOrderNo : string}
  customer?: { id : string }
  shortOrder?: string
  customerId?: string
  invoiceNo: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  total: string
  type: string
  description: string
  invoiceDate: string
  dueDate: string
  prefix: string
  expireDate: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface AccountRecivable {
  id?: any
  customer?: string
  invoiceNo?: string
  invoiceDate?: string
  advancedAmount?: number
  invoicedAmount?: number
  outstandingAmount?: number
}

export interface AccountRecivablePaginator
  extends PaginatorInfo<AccountRecivable> {}
