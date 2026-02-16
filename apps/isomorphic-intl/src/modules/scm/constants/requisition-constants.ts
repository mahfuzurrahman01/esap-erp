"use client"

import {
  RequisitionInput,
  RequisitionItemDtos,
  RequisitionUpdate,
} from "../types/procurement/requisition/requisition-types"

export const DEFAULT_REQUISITION_VALUES: RequisitionInput | RequisitionUpdate =
  {
    supplierId: 0,
    companyId: 0,
    companyName: "",
    currencyId: 0,
    currencyName: "",
    requestedBy: "",
    requestedDate: "",
    expectedDeliveryDate: "",
    projectName: "",
    billingStatus: "",
    priority: "",
    fiscalPosition: "",
    paymentTermsId: 0,
    totalQuantity: 0,
    reqAmount: 0,
    documentFile: "",
  }

export const DEFAULT_REQUISITION_ITEM_VALUES: RequisitionItemDtos = {
  requisitionId: 0,
  productId: 0,
  itemUnitId: 0,
  itemUnitName: "",
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
}
