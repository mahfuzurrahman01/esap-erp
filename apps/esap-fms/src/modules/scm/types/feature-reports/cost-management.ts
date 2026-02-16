import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface CostManagement {
  id?: number
  sl?: number
  productName?: string
  workCenter?: string
  materialCost?: number
}

export interface CostManagementQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
  workCenter?: string
}

export type CostManagementPaginator = PaginatedResponse<CostManagement>
