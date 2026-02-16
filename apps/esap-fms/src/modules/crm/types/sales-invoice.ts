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

export interface SalesInvoiceQueryOptions extends QueryOptions {
  name?: string
  salesInvoiceNo?: string
  invoiceDate?: string
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

export interface SalesInvoiceList {
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

export interface SalesInvoiceUpdate {
  id: string
  data: []
}

export interface SalesInvoiceCreateFormTypes {
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

export interface SalesInvoiceEditFormTypes {
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
  SalesInvoice_prefix: string
  expiry_date: string
  stages?: string
  action?: string
  status: string
}

export interface SalesInvoiceEditFormProps {
  id: string
  SalesInvoiceData: SalesInvoiceEditFormTypes
}

export interface SalesInvoiceEditComponentProps {
  id: string
}

export interface SalesInvoiceDetailsComponentProps {
  id: string
  name?: string
}

export interface SalesInvoiceDetails {
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

export interface SalesInvoiceCreationFormTypes {
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

export interface SalesInvoiceFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface SalesInvoiceFormData {
  id?: string
  quotation: string
  customerId: string
  salesInvoiceNo: string
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
  salesInvoiceDetails: []
}

export interface SalesInvoice {
  id?: any
  salesOrderId?: string
  customerId?: string
  quotationNo?: string
  invoiceNo?: string
  type?: string
  invoiceDate?: string
  dueDate?: string
  paymentTerms?: string
  paymentMethod?: string
  currencyId?: any
  discountAmount?: number
  subtotal?: number
  discount?: number
  tax?: number
  total?: number
  action?: string
  created_at?: string
  companyId?: any
  salesOrder?: any
  customer?: any
  billingZip?: string
  shippingZip?: string
  companyZip?: string
  companyCity?: string
  stages?: string
  file?: File
  filePath?: File
  discountType?: string
  billingContactPerson?: string
  shippingContactPerson?: string
  companyContactPerson?: string
  billingCountryId?: string
  billingStreet?: string
  shippingStreet?: string
  companyStreet?: string
  billingHouse?: string
  shippingHouse?: string
  companyHouse?: string
  billingCity?: string
  shippingCity?: string
  billingState?: string
  shippingState?: string
  companyState?: string
  shippingCountryId?: string
  companyCountryId?: string
  bankAccountId?: string
  costCenterId?: string
  debitToId?: string
  netPayable?: string
  priceList?: string
  taxCategoryId?: string
  taxTemplateId?: string
  warehouseId?: string
  description?: string
  customersPO?: string
  customerPODate?: string
  status?: string
  applyDiscount?: string
  totalQuantity?: number
  totalAmount?: number
  totalAmountOnCustomerCurrency?: number
  totalAmountOnCompanyCurrency?: number
  grandTotal?: number
  totalAdvanceAmount?: number
  totalAdvanceQuantity?: number
  discountPercentage?: number
  totalAdvance?: number
  exchangeRate?: number
  customerCurrencyId?: number
  companyCurrencyId?: number
  totalTaxes?: number
  outstandingAmount?: number
  updateStock?: boolean
  isOpeningEntry?: boolean
  ignorePricingRule?: boolean
  isCashOrNonTradeDiscount?: boolean
  isRateAdjustmentEntry?: boolean
  isReturn?: boolean
  grandTotalOnCustomerCurrency?: number
  grandTotalOnCompanyCurrency?: number
  invoiceProductDetailsDTOs?: SalesInvoiceDetail[]
  taxDetails?: taxDetails[]
  invoiceVatTaxDetailsDTOs?: taxDetails[]
  invoiceAdvancePayments?: invoiceAdvancePayments[]
}

export type SalesInvoiceDetail = {
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

export type invoiceAdvancePayments = {
  id?: string
  chartOfAccountId: number
  taxRate: number
  taxAmount: number
  taxTypeId: number
}

export type taxDetails = {
  id?: string
  chartOfAccountId: number
  taxRate: number
  taxAmount: number
  taxTypeId: number
}

export type SalesInvoiceDetailsView = {
  id: string
  title: string
  billingAddress: string
  shippingAddress: string
  type: string
  invoiceNo: string
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
  salesInvoiceDetails?: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
}

export interface SalesInvoiceEditComponentProps {
  id: string
}

export interface SalesInvoicePaginator
  extends PaginatorInfo<SalesInvoice> {}
