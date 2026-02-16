import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type DepartmentStats = {
  name: string
  total: number
  saudi: number
  expat: number
}

export type DepartmentStatsQueryOptions = HRMSFetchQueryOptions

export type DepartmentStatsDataResponse = PaginatedResponse<DepartmentStats>
