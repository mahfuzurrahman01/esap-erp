import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"

export const defaultStockReplenishment: StockReplenishment = {
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  id: 0,
  inventoryId: 0,
  sku: "",
  supplierId: 0,
  supplierName: "",
  productId: 0,
  productName: "",
  currentStock: 0,
  replenishmentQty: 0,
  replenishmentMethod: "",
  expectedDeliveryDate: new Date().toISOString(),
  status: "pending",
}
