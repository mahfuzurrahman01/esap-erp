import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type EmployeeType = {
  id?: number | undefined
  employeeTypeName: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type EmployeeTypeDataResponse = PaginatedResponse<EmployeeType>
export type EmployeeTypeQueryOptions = HRMSFetchQueryOptions
