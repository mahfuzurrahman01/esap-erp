import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";





export interface WarehouseInput {
  id?: number
  warehouseName?: string
  warehouseManagerId?: number
  companyId?: number
  companyName?: string
  location?: string
  capacity?: number
  inUseCapacity?: number
  startHour?: string
  endHour?: string
  zoningLocation?: string
  binLocation?: string
  pickedBy?: string
  packedBy?: string
  quantityToPick?: number
  datePicked?: string
  temperatureControlled?: boolean
  fireSafetyCompliance?: boolean
  emergencyContact?: string
  status?: boolean
}

export interface Warehouse {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id: number
  warehouseName?: string
  warehouseManagerId?: number
  warehouseManagerName?: string
  companyId?: number
  companyName?: string
  location?: string
  capacity?: number
  inUseCapacity?: number
  startHour?: string
  endHour?: string
  zoningLocation?: string
  binLocation?: string
  pickedBy?: string
  packedBy?: string
  quantityToPick?: number
  datePicked?: string
  temperatureControlled?: boolean
  fireSafetyCompliance?: boolean
  emergencyContact?: string
  status?: boolean
}

export interface WarehouseQueryOptions extends QueryOptions {
  companyName?: string
  location?: string
  status?: boolean
  capacity?: string
  inUseCapacity?: string
  managerName?: string
}

export type WarehousePaginator = PaginatedResponse<Warehouse>