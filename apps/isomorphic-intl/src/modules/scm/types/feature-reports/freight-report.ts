import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface FreightReport {
  id?: number
  sl?: number
  origin?: string
  destination?: string
  cost?: number
}

export interface FreightReportQueryOptions extends QueryOptions {
  fromDate?: string
  toDate?: string
  origin?: string
  destination?: string
}

export type FreightReportPaginator = PaginatedResponse<FreightReport>