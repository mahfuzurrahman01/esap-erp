import { PaginationResponse, QueryOptions } from "./index"

export interface TermsAndConditionsQueryOptions extends QueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  isDisabled?: boolean
  isSelling?: boolean
  isBuying?: boolean
  sort?: string
}

export interface TermsAndConditionsList {
  id: number
  termsAndConditionName: string
  isDisabled?: boolean
  isSelling?: boolean
  isBuying?: boolean
  description?: string
  isActive?: boolean
  isDeleted?: boolean
  actions?: string
}

export type TermsAndConditionsPaginator =
  PaginationResponse<TermsAndConditionsList>
