import {
  PurchasedOrderInput,
  PurchasedOrderItemDtos,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

export const defaultPurchaseOrderItemDtos: PurchasedOrderItemDtos = {
  productId: 0,
  productName: "",
  itemUnitId: 0,
  itemUnitName: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
}

export const defaultPurchaseOrderValues: PurchasedOrderInput & {
  savePurchaseOrderItemDtos: PurchasedOrderItemDtos[]
} = {
  supplierId: 0,
  currencyId: 0,
  poDate: new Date().toISOString(),
  expectedDeliveryDate: new Date().toISOString(),
  savePurchaseOrderItemDtos: [],
}
