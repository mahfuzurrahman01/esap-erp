import { PaginationResponse, QueryOptions } from "./index"

export interface ModeOfPaymentTypeQueryOptions extends QueryOptions {
  orderBy?: string
  sortedBy?: string
  companyId?: string
}

export interface ModeOfPaymentTypeList {
  id?: number
  modeOfPaymentTypeName: string
}

export interface ModeOfPaymentTypePaginator
  extends PaginationResponse<ModeOfPaymentTypeList> {}
