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

export interface SalesOrderQueryOptions extends QueryOptions {
  name?: string
  salesOrderNo?: string
  quotation?: { quotationNo : any}
  customer?: string
  title?: string
  type?: string
  delivaryDate?: string
  courier?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface SalesOrderList {
  id?: any
  title: string
  customer: { id: any }
  shortOrder?: string
  customerId?: string
  salesOrderNo: string
  quotation?: { id: any, quotationNo : any}
  billing_address: string
  shipping_address: string
  payment_terms: string
  total: string
  type: string
  description: string
  delivaryDate: string
  prefix: string
  expireDate: string
  stages: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface SalesOrderUpdate {
  id: string
  data: []
}

export interface SalesOrderCreateFormTypes {
  quotation_id: string
  customer_id: string
  sales_order_no: string
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

export interface SalesOrderEditFormTypes {
  id?: string
  quotation: string
  customer: string
  sales_order_no: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type?: string
  courier?: string
  description: string
  stage: string
  SalesOrder_prefix: string
  expiry_date: string
  stages?: string
  action?: string
  status: string
}

export interface SalesOrderEditFormProps {
  id: string
  SalesOrderData: SalesOrderEditFormTypes
}

export interface SalesOrderEditComponentProps {
  id: string
}

export interface SalesOrderDetailsComponentProps {
  id: string
  name?: string
}

export interface SalesOrderDetails {
  id: number
  sn: number
  Product: string
  quantity: string
  unit: string
  unitPrice: string
  vat: string
  tax: string
  discount: string
}

export interface SalesOrderCreationFormTypes {
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

export interface SalesOrderFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface SalesOrderFormData {
  id?: string
  quotation: string
  customerId: string
  salesOrderNo: string
  quotationId?: string
  quotation_no?: string
  billing_address: string
  shipping_address: string
  payment_terms: string
  type: string
  billingAddress?: string
  shippingAddress?: string
  expireDate?: string
  updateStock?: boolean
  courier?: string
  warehouseId?: string
  title?: string
  description: string
  stage: string
  prefix: string
  expiry_date: string
  action?: string
  created_at?: string
  status: string
  file?: File
  filePath?: File
  salesOrderDetails: []
}

export interface SalesOrder {
  id?: string
  quotationId?: string
  customerId?: string
  quotationNo?: string
  salesOrderNo?: string
  type?: string
  postingDate?: string
  delivaryDate?: string
  expireDate?: string
  billingAddress?: string
  shippingAddress?: string
  paymentTerms?: string
  title?: string
  deliveryStatus?: string
  currencyId?: number
  warehouseId?: string
  updateStock?: boolean
  description?: string
  prefix?: string
  discountAmount?: number
  subtotal?: number
  discount?: number
  tax?: number
  total?: number
  action?: string
  created_at?: string
  companyId?: number
  billingZip?: string
  shippingZip?: string
  stages?: string
  file?: File
  filePath?: File
  discountType?: string
  billingCountryId?: string
  shippingCountryId?: string
  salesOrderDetails?: SalesOrderDetail[]
  taxDetails?: taxDetails[]
  salesOrderVatTaxDetailsDTOs?: taxDetails[]
}

export type SalesOrderDetail = {
  id?: string
  productId?: string
  quantity?: number
  unit?: string
  unitPrice?: number
  vat?: number
  tax?: number
  discount?: number
  totalPrice?: number
}

export type taxDetails = {
  id?: string
  chartOfAccountId: number
  taxRate: number
  taxAmount: number
  taxTypeId: number
  total?: number
}

export type SalesOrderDetailsView = {
  id: string
  title: string
  billingAddress: string
  shippingAddress: string
  type: string
  salesOrderNo: string
  prefix: string
  customer: {
    firstName: string
    lastName: string
  }
  deliveryStatus: string
  expireDate: string | null
  updateStock: boolean
  warehouse: string
  description: string
  filePath?: string
  salesOrderDetails?: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

export interface SalesOrderEditComponentProps {
  id: string
}

export interface SalesOrderPaginator extends PaginatorInfo<SalesOrderList> {}
