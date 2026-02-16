import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";



import { PurchasedOrderApproval } from "./purchased-order-approval-types";





export interface PurchasedOrderForm {
  requisitionId?: number
  supplierId?: number
  paymentTermsId?: number
  warehouseId?: number
  poDate?: string
  requestedBy?: string
  projectName?: string
  billingStatus?: string
  fiscalPosition?: string
  expectedDeliveryDate?: string
  priority?: string
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  taxCategoryId?: number
  taxCategoryName?: string
  purchaseTaxTemplateId?: number
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
  shippingAddress?: string
  shippingStreet?: string
  shippingCity?: string
  shippingState?: string
  shippingCountry?: string
  shippingZipCode?: string
  shippingContactPerson?: string
  shippingContactPhone?: string
  shippingContactEmail?: string
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
  totalQuantity?: number
  orderAmount?: number
  totalTax?: number
  grandTotal?: number
  netTotalAmount?: number
  advancePaid?: number
  addDiscountApplyOn?: string
  addDiscountPercent?: number
  addDiscountAmount?: number
  attachmentFile?: string
}

export interface PurchaseOrderItemRow {
  id: number
  productId: number
  productCode: string
  productName: string
  itemUnitId: number
  itemUnitName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface PurchasedOrderItemDtos {
  productId?: number
  productName?: string
  itemUnitId?: number
  itemUnitName?: string
  quantity?: number
  unitPrice?: number
  totalPrice?: number
}

export interface PurchaseTaxAndCharges {
  taxTypeId?: number
  taxTypeName?: string
  chartOfAccountId?: number
  chartOfAccountName?: string
  rate?: number
  amount?: number
  total?: number
}

export interface PurchasedOrderInput extends PurchasedOrderForm {
  savePurchaseOrderItemDtos?: PurchasedOrderItemDtos[]
  purchaseOrderVatTaxDetails?: PurchaseTaxAndCharges[]
}

export interface PurchasedOrderItemUpdateDto extends PurchasedOrderItemDtos {
  id?: number
  purchaseOrderId?: number
}

export interface PurchaseTaxAndChargesUpdateDto extends PurchaseTaxAndCharges {
  id?: number
  purchaseOrderId?: number
}

export interface PurchasedOrderUpdate extends PurchasedOrderForm {
  id?: number
  updatePurchaseOrderItemDtos?: PurchasedOrderItemUpdateDto[]
  purchaseOrderVatTaxDetails?: PurchaseTaxAndChargesUpdateDto[]
}

export interface PurchasedOrder {
  createdDate?: string
  updatedDate?: string
  id?: number
  requisitionId?: number
  supplierId?: number
  supplierName?: string
  paymentTermsId?: number
  paymentTerms?: string
  warehouseId?: number
  purchaseOrderNo?: string
  poDate?: string
  requestedBy?: string
  projectName?: string
  billingStatus?: string
  fiscalPosition?: string
  expectedDeliveryDate?: string
  priority?: string
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  taxCategoryId?: number
  taxCategoryName?: string
  purchaseTaxTemplateId?: number
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
  shippingAddress?: string
  shippingStreet?: string
  shippingCity?: string
  shippingState?: string
  shippingCountry?: string
  shippingZipCode?: string
  shippingContactPerson?: string
  shippingContactPhone?: string
  shippingContactEmail?: string
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
  totalQuantity?: number
  orderAmount?: number
  totalTax?: number
  grandTotal?: number
  netTotalAmount?: number
  advancePaid?: number
  addDiscountApplyOn?: string
  addDiscountPercent?: number
  addDiscountAmount?: number
  attachmentUrl?: string
  documentFile?: string
  approvalStatus?: string
  approvalDate?: string
  attachmentFile?: string
  purchaseOrderItemDtos?: (PurchasedOrderItemDtos & {
    id?: number
    purchaseOrderId?: number
  })[]
  purchaseOrderVatTaxDetails?: (PurchaseTaxAndCharges & {
    id?: number
    purchaseOrderId?: number
  })[]
  purchasedOrderApproval?: PurchasedOrderApproval
}

export interface PurchasedOrderQueryOptions extends QueryOptions {
  poDate?: string
  billingStatus?: string
  orderAmount?: string
}

export type PurchasedOrderPaginator = PaginatedResponse<PurchasedOrder>