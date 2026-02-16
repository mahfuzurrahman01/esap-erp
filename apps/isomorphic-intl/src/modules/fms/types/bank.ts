import { PaginationResponse } from "./index"

export interface BankQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  sort?: string
}

export interface BankList {
  id?: number
  bankName: string
  bankWebsite?: string
  swiftCode?: string
  routingNumber?: string
  contactNumber?: string
  actions?: string
}

export type BankPaginator = PaginationResponse<BankList>
