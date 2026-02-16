import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export type InvoiceStatus = "Pending" | "Approved" | "Rejected"

export interface InvoiceForm {
  requisitionId?: number
  salesOrderId?: number
  supplierId?: number
  paymentTermsId?: number
  warehouseId?: number
  invoiceDate?: string
  dueDate?: string
  requestedBy?: string
  projectName?: string
  billingStatus?: string
  fiscalPosition?: string
  expectedDeliveryDate?: string
  priority?: string
  isReturned?: boolean
  updateStock?: boolean
  companyId?: number
  companyName?: string
  currencyId?: number
  priceList?: string
  ignorePricingRule?: boolean
  defaultCostCenterForRoundOff?: boolean
  currencyName?: string
  taxCategoryId?: number
  taxCategoryName?: string
  TaxTemplateId?: number
  purchaseTaxTemplateName?: string
  billingStreet?: string
  supplierStreet?: string
  supplierCity?: string
  supplierState?: string
  supplierCountry?: string
  supplierZipCode?: string
  supplierContactName?: string
  supplierContactEmail?: string
  supplierContactPhone?: string
  shippingHouse?: string
  shippingStreet?: string
  shippingCity?: string
  shippingState?: string
  shippingCountry?: string
  shippingZip?: string
  shippingContactPerson?: string
  shippingCountryId?: string
  companyAddress?: string
  companyStreet?: string
  companyCity?: string
  companyState?: string
  companyCountry?: string
  companyZipCode?: string
  companyTrn?: string
  companyContactPerson?: string
  companyContactPhone?: string
  companyContactEmail?: string
  creditToId?: number
  creditToName?: string
  isOpeningEntry?: boolean
  totalQuantity?: number
  totalAmount?: number
  totalTaxes?: number
  grandTotal?: number
  netTotalAmount?: number
  totalAdvance?: number
  outstandingAmount?: number
  addDiscountApplyOn?: string
  addDiscountPercent?: number
  addDiscountAmount?: number
  writeOffAccountId?: number
  writeOffCostCenterId?: number
  writeOffAmount?: number
}

export interface InvoiceItemDtos {
  id?: number
  invoiceId?: number
  productId?: number
  productName?: string
  quantity?: number
  unitPrice?: number
  totalPrice?: number
}

export interface PurchaseTaxAndCharges {
  id?: number
  invoiceBillId?: number
  taxTypeId?: number
  taxTypeName?: string
  chartOfAccountId?: number
  chartOfAccountName?: string
  taxRate?: number
  taxAmount?: number
  totalAmount?: number
}

export interface InvoiceAdvancePayments {
  id?: number
  invoiceBillId?: number
  referenceName?: string
  remarks?: string
  advanceAmount?: number
  allocatedAmount?: number
}

export interface InvoiceInput extends InvoiceForm {
  saveInvoiceItemDtos: InvoiceItemDtos[]
  invoiceVatTaxDetails: PurchaseTaxAndCharges[]
  invoiceAdvancePayments: InvoiceAdvancePayments[]
}

export interface InvoiceUpdate extends InvoiceForm {
  id?: number
  updateInvoiceItemDtos?: InvoiceItemDtos[]
  invoiceVatTaxDetails?: PurchaseTaxAndCharges[]
  invoiceAdvancePayments?: InvoiceAdvancePayments[]
}

export interface Invoice {
  createdDate?: string
  updatedDate?: string
  id?: number
  requisitionId?: number
  salesOrderId?: number
  supplierId?: number
  priceList?: string
  supplierName?: string
  paymentTermsId?: number
  paymentTerms?: string
  warehouseId?: number
  invoiceBillNo?: string
  invoiceDate?: string
  dueDate?: string
  requestedBy?: string
  projectName?: string
  billingStatus?: string
  fiscalPosition?: string
  expectedDeliveryDate?: string
  priority?: string
  isReturned?: boolean
  updateStock?: boolean
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  taxCategoryId?: number
  taxCategoryName?: string
  TaxTemplateId?: number
  purchaseTaxTemplateName?: string
  supplierAddress?: string
  supplierStreet?: string
  supplierCity?: string
  supplierState?: string
  supplierCountry?: string
  supplierZipCode?: string
  supplierContactName?: string
  supplierContactEmail?: string
  supplierContactPhone?: string
  shippingHouse?: string
  shippingStreet?: string
  shippingCity?: string
  shippingState?: string
  shippingCountry?: string
  shippingZip?: string
  shippingContactPerson?: string
  shippingCountryId?: string
  companyAddress?: string
  companyStreet?: string
  companyCity?: string
  companyState?: string
  companyCountry?: string
  companyZipCode?: string
  companyTrn?: string
  companyContactPerson?: string
  companyContactPhone?: string
  companyContactEmail?: string
  creditToId?: number
  creditToName?: string
  isOpeningEntry?: boolean
  totalQuantity?: number
  totalAmount?: number
  totalTaxes?: number
  grandTotal?: number
  netTotalAmount?: number
  totalAdvance?: number
  outstandingAmount?: number
  addDiscountApplyOn?: string
  addDiscountPercent?: number
  addDiscountAmount?: number
  writeOffAccountId?: number
  writeOffCostCenterId?: number
  writeOffAmount?: number
  paymentStatus?: number
  invoiceItemDtos?: InvoiceItemDtos[]
  invoiceAdvancePayments?: InvoiceAdvancePayments[]
  invoiceVatTaxDetails?: PurchaseTaxAndCharges[]
}

export interface InvoiceQueryOptions extends QueryOptions {
  poId?: string
  billingStatus?: string
}

export type InvoicePaginator = PaginatedResponse<Invoice>
