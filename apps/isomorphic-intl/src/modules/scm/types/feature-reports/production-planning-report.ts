import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ProductionPlanningReport {
  id?: string
  sl?: number
  productName?: string
  workCenter?: string
  assignTo?: string
  orderQuantity?: number
  workProgress?: string
}

export interface ProductionPlanningReportQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
  workCenter?: string
  assignTo?: string
  workProgress?: string
}

export type ProductionPlanningReportPaginator =
  PaginatedResponse<ProductionPlanningReport>
