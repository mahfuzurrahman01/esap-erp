import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { SalaryRule } from "./salary-rules.types"
import { SalaryStructureType } from "./salary-structure-type.types"

export interface SalaryStructure {
  id?: number
  salaryStructureName: string
  salaryStructureTypeId: number
  salaryStructureType?: SalaryStructureType
  description?: string | null
  salaryRules?: SalaryRule[]
}

export type SalaryStructureCreateInput = Omit<
  SalaryStructure,
  "id" | "salaryStructureType" | "salaryRules"
> & {
  salaryRuleIds: number[] // For POST request, only IDs are needed
}

export type SalaryStructureUpdateInput = Partial<SalaryStructureCreateInput> & {
  id: number
}

export type SalaryStructureQueryOptions = HRMSFetchQueryOptions
export type SalaryStructureDataResponse = PaginatedResponse<SalaryStructure>
