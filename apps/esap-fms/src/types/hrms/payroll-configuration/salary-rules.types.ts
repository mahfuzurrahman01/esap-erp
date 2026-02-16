import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { SalaryCategory } from "./salary-category.types"

export type ComputationType = "FixedAmount" | "Formula" | "Percentage" | ""

export type SalaryRule = {
  id?: number
  salaryRuleName: string
  salaryCategory?: SalaryCategory
  salaryCategoryId: number | null
  sequence: string | null
  isActive?: boolean
  computationType: ComputationType | null
  amount?: number | null
  formula?: string | null
  quantity?: number | null
  description?: string | null
}

export type SalaryRuleCreateInput = Omit<
  SalaryRule,
  "id" | "salaryCategory"
> & {
  salaryCategoryId?: number
}

export type SalaryRuleUpdateInput = Partial<SalaryRuleCreateInput> & {
  id?: number
}

export type SalaryRuleQueryOptions = HRMSFetchQueryOptions
export type SalaryRuleDataResponse = PaginatedResponse<SalaryRule>
