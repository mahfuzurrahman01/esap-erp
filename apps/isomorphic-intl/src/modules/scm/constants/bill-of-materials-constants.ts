import { BillOfMaterialItems, BillOfMaterials } from "../types/production-control/bill-of-materials/bill-of-materials-type";

export const DEFAULT_BILL_OF_MATERIALS_VALUES: BillOfMaterials = {
  companyId: 0,
  companyName: "",
  currencyId: 0,
  currencyName: "",
  workCenterId: 0,
  workCenterName: "",
  scheduledFrom: "",
  scheduledTo: "",
  materialCost: 0,
  billOfMaterialItems: [],
}

export const DEFAULT_BILL_OF_MATERIALS_ITEM_VALUES: BillOfMaterialItems = {
  id: 0,
  billOfMaterialId: 0,
  productId: 0,
  itemUnitId: 0,
  quantity: 0,
  unitCost: 0,
  totalCost: 0,
}
