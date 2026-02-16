import { CapacityPlanning } from "@/modules/scm/types/demand-and-forecasting/capacity-planning/capacity-planning-types"

export const defaultCapacityPlanning: CapacityPlanning = {
  inventoryId: 0,
  sku: "",
  productId: 0,
  productName: "",
  supplierCapacity: 0,
  manufacturingCapacity: 0,
  warehouseCapacity: 0,
  plannedProductionDate: "",
  plannedProductionQuantity: 0,
}
