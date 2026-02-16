import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";





export interface CapacityPlanning {
  id?: number
  inventoryId?: number
  sku?: string
  productId?: number
  productName?: string
  supplierCapacity?: number
  manufacturingCapacity?: number
  warehouseCapacity?: number
  plannedProductionDate?: string
  plannedProductionQuantity?: number
  createdDate?: string
  updatedDate?: string
}

export interface CapacityPlanningQueryOptions extends QueryOptions {
  sku?: string
  productName?: string
  minManufactCapacity?: number | string
  maxManufactCapacity?: number | string
  minSupplierCapacity?: number | string
  maxSupplierCapacity?: number | string
  minWarehouseCapacity?: number | string
  maxWarehouseCapacity?: number | string
  createdDate?: string
  updatedDate?: string
}

export type CapacityPlanningPaginator = PaginatedResponse<CapacityPlanning>