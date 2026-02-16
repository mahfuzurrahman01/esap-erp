import { PaginationResponse, QueryOptions } from "./index"

export interface TopBankAccountQueryOptions extends QueryOptions {
  periodType?: string
}

export interface TopBankAccount {
  bankAccountId: number
  bankAccountName: string
  bankAccountTypeName: string
}

export type TopBankAccountList = TopBankAccount[]
