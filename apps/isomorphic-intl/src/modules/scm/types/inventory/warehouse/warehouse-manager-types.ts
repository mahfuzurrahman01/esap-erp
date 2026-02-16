import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface WarehouseManagerInput {
  id?: number
  name: string
  contact?: string
}

export interface WarehouseManager {
  createdDate?: string
  updatedDate?: string
  id?: number
  name: string
  contact?: string
}

export interface WarehouseManagerQueryOptions extends QueryOptions {
  name?: string
}

export type WarehouseManagerPaginator = PaginatedResponse<WarehouseManager>
