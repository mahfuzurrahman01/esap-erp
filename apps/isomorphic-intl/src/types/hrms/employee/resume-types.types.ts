import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type ResumeType = {
  id?: number | undefined
  resumeTypeName: string
  description?: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type ResumeTypeDataResponse = PaginatedResponse<ResumeType>
export type ResumeTypeQueryOptions = HRMSFetchQueryOptions
