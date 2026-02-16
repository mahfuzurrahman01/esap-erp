import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type SalaryCategory = {
  id?: number
  salaryCategoryName: string
  code: string
  description?: string
  transactionType: string
}

export type SalaryCategoryQueryOptions = HRMSFetchQueryOptions
export type SalaryCategoryDataResponse = PaginatedResponse<SalaryCategory>
