import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"

export const defaultValues: Partial<Stock> = {
  productId: 0,
  warehouseId: 0,
  currentQuantity: 0,
  reorderLevel: 0,
  stockValuationMethod: "",
  reorderQuantity: 0,
  status: "",
  entryType: "",
  unitStockValue: 0,
  totalStockValue: 0,
}
