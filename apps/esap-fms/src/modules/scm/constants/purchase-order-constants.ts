import { PurchaseTaxAndCharges, PurchasedOrderInput, PurchasedOrderItemDtos, PurchasedOrderUpdate } from "../types/procurement/purchased-order/purchased-order-types";





export const DEFAULT_PURCHASED_ORDER_VALUES:
  | PurchasedOrderInput
  | PurchasedOrderUpdate = {
  supplierId: 0,
  requisitionId: 0,
  requestedBy: "",
  projectName: "",
  priority: "",
  expectedDeliveryDate: "",
  poDate: "",
  companyName: "",
  companyId: 0,
  currencyId: 0,
  currencyName: "",
  warehouseId: 0,
  orderAmount: 0,
  totalQuantity: 0,
  taxCategoryId: 0,
  taxCategoryName: "",
  purchaseTaxTemplateId: 0,
  purchaseTaxTemplateName: "",
  attachmentFile: "",
  totalTax: 0,
  grandTotal: 0,
  netTotalAmount: 0,
  advancePaid: 0,
  addDiscountApplyOn: "",
  addDiscountPercent: 0,
  addDiscountAmount: 0,
  supplierAddress: "",
  supplierStreet: "",
  supplierCity: "",
  supplierState: "",
  supplierCountry: "",
  supplierZipCode: "",
  supplierContactName: "",
  supplierContactEmail: "",
  supplierContactPhone: "",
  companyAddress: "",
  companyStreet: "",
  companyCity: "",
  companyState: "",
  companyCountry: "",
  companyZipCode: "",
  companyContactPerson: "",
  companyContactPhone: "",
  companyContactEmail: "",
  companyTrn: "",
  shippingAddress: "",
  shippingStreet: "",
  shippingCity: "",
  shippingState: "",
  shippingCountry: "",
  shippingZipCode: "",
  shippingContactPerson: "",
  shippingContactPhone: "",
  shippingContactEmail: "",
  paymentTermsId: 0,
  billingStatus: "",
  fiscalPosition: "",
}


export const DEFAULT_PURCHASED_ORDER_PRODUCT_ITEMS_VALUES: PurchasedOrderItemDtos = {
  productId: 0,
  itemUnitId: 0,
  itemUnitName: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
}

export const DEFAULT_PURCHASE_TAX_AND_CHARGES: PurchaseTaxAndCharges = {
  taxTypeId: 0,
  taxTypeName: "",
  chartOfAccountId: 0,
  chartOfAccountName: "",
  rate: 0,
  amount: 0,
  total: 0,
}