import { Stock } from "../types/inventory/stock-overview/stock-overview-types";

export const DEFAULT_STOCK_VALUES: Stock = {
  warehouseId: 0,
  productId: 0,
  currentQuantity: 0,
  reorderLevel: 0,
  reorderQuantity: 0,
  stockValuationMethod: "",
  entryType: "",
  status: "",
  unitStockValue: 0,
  totalStockValue: 0,
}

