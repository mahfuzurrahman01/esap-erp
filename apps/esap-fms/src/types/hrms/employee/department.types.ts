import {
  EmployeeShortInfo,
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type Department = {
  id?: number | undefined
  departmentName: string
  manager?: EmployeeShortInfo | null
  managerId: number | null
  color?: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type DepartmentFullDetails = {
  id?: number | undefined
  departmentName: string
  manager: EmployeeShortInfo | null
  color?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DepartmentQueryOptions = HRMSFetchQueryOptions
export type DepartmentsDataResponse = PaginatedResponse<Department>
