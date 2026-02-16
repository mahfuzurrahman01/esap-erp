import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type EmploymentType = {
  id?: number
  employmentTypeName: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type EmploymentTypeDataResponse = PaginatedResponse<EmploymentType>
export type EmploymentTypeQueryOptions = HRMSFetchQueryOptions
