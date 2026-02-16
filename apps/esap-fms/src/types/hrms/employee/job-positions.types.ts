import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type JobPosition = {
  id?: number
  jobPositionName: string
  description?: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export type JobPositionCreateInput = {
  jobPositionName: string
  description?: string | null
}

export type JobPositionUpdateInput = {
  id?: number
  jobPositionName: string
  description?: string | null
}

export type JobPositionQueryOptions = HRMSFetchQueryOptions
export type JobPositionsDataResponse = PaginatedResponse<JobPosition>
