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

export interface QuotationQueryOptions extends QueryOptions {
  name?: string
  quataton?: string
  quotationNo?: string
  customer?: string
  type?: string
  expiryDate?: string
  approvalStatus?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  status?: string
  searchTerm?: string | null
}

export interface QuotationList {
  id?: any
  opportunity: string
  customer: {id:string}
  shortOrder?: string
  customerId?: string
  quotationNo: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type: string
  title?: string
  deliveryStatus?: string
  description: string
  stage: string
  approvalStatus?: string
  prefix: string
  expiryDate: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface QuotationUpdate {
  id: string
  data: []
}

export interface QuotationCreateFormTypes {
  opportunity_id: string
  customer_id: string
  quotation_no: string
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

export interface QuotationEditFormTypes {
  id?: string
  opportunity: string
  customer: string
  quotation_no: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type?: string
  courier?: string
  description: string
  stage: string
  quotation_prefix: string
  expiry_date: string
  stages?: string
  action?: string
  status: string
}

export interface QuotationDetails {
  id: number
  sn: number
  productId: string
  quantity: string
  unit: string
  unitPrice: string
  vat: string
  tax: string
  discount: string
}

export interface QuotationDetailsView {
  id?: string
  title: string
  billingAddress: string
  shippingDeliveryAddress: string
  type: string
  prefix: string
  quotationNo: string
  paymentTerms: string
  approvalStatus?: string
  deliveryStatus: string
  expiryDate: string | null
  createdBy: string
  filePath: string | null
  createdAt: string | null
  status: string
  quotationDetails?: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

export interface QuotationEditFormProps {
  id: string
  QuotationData: QuotationEditFormTypes
}

export interface QuotationEditComponentProps {
  id: string
}

export interface QuotationDetailsComponentProps {
  id: string
  name?: string
  printRef?: any
}

export interface QuotationCreationFormTypes {
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

export interface QuotationFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Quotation {
  id?: string
  opportunityId?: string
  customerId?: string
  quotationNo?: string
  billingStreet?: string
  billingHouse?: string
  billingZip?: string
  billingCity?: string
  billingState?: string
  billingCountryId?: string
  shippingStreet?: string
  shippingHouse?: string
  shippingZip?: string
  shippingCity?: string
  shippingState?: string
  shippingCountryId?: string
  title?: string
  courier?: string
  paymentTerms?: string
  type?: string
  description?: string
  deliveryStatus?: string
  stage?: string
  prefix?: string
  expiryDate?: string
  action?: string
  created_at?: string
  status?: string
  file?: File
  filePath?: File
  quotationDetails?: QuotationDetail[]
}

export type QuotationDetail = {
  id?: number | string
  productId?: string
  quantity?: number
  unit?: string
  unitPrice?: number
  totalPrice?: number
  vat?: number
  tax?: number
  discount?: number
  total?: number
}

export interface QuotationEditComponentProps {
  id: string
}

export interface QuotationPaginator extends PaginatorInfo<QuotationList> {}
