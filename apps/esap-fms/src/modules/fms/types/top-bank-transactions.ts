import { PaginationResponse, QueryOptions } from "./index"

export interface TopBankTransactionsQueryOptions extends QueryOptions {
  periodType?: string
  bankAccountId?: number
}

export interface TopBankTransactionsList {
  deposit: number
  withdraw: number
  transactionDate: string
}

export type TopBankTransactionsPaginator = PaginationResponse<TopBankTransactionsList>
