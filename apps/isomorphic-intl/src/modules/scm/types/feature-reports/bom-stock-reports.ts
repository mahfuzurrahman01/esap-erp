import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface BomStockReports {
  id?: number
  sl?: number
  productName?: string
  unitName?: string
  quantity?: number
  unitCost?: number
  totalCost?: number
}

export interface BomStockReportsQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  productName?: string
  unitName?: string
}

export type BomStockReportsPaginator = PaginatedResponse<BomStockReports>
