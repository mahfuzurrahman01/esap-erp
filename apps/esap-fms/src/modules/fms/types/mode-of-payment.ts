import { COAList, CompanyList, PaginationResponse, QueryOptions } from "./index"

export interface ModeOfPaymentQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
  companyId?: string
}

export interface ModeOfPaymentList {
  id?: number
  modeOfPaymentName: string
  modeOfPaymentType: string
  company?: CompanyList | null
  chartOfAccount?: COAList | null
  isActive?: boolean
  comment?: string | null
  actions?: string
  companyId?: number | null
  chartOfAccountId?: number | null
}

export interface ModeOfPaymentDetails {
  id: number
  modeOfPaymentId?: number | null
  companyId?: number | null
  companyName?: string | null
  chartOfAccountId?: number | null
  chartOfAccountName?: string | null
}

export interface ModeOfPaymentPaginator
  extends PaginationResponse<ModeOfPaymentList> {}
