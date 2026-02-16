import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type ComputationType = "FixedAmount" | "Formula" | "Percentage" | ""

export type SalaryStructureType = {
  id?: number
  salaryStructureTypeName: string
  country: string
}

export type SalaryStructureTypeCreateInput = Omit<SalaryStructureType, "id">

export type SalaryStructureTypeUpdateInput =
  Partial<SalaryStructureTypeCreateInput> & {
    id?: number
  }

export type SalaryStructureTypeQueryOptions = HRMSFetchQueryOptions
export type SalaryStructureTypeDataResponse =
  PaginatedResponse<SalaryStructureType>
