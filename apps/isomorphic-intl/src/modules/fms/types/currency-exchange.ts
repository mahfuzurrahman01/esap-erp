import { CurrencyList, PaginationResponse, QueryOptions } from "./index"

export interface CurrencyExchangeQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
}

export interface CurrencyExchangeList {
  id?: number
  currencyExchangeNo?: string
  dateOfEstablishment: string
  currencyFromId: number
  currencyToId: number
  currencyFrom?: CurrencyList
  currencyTo?: CurrencyList
  currencyToName?: string
  exchangeRate: string | number
  isPurchase?: boolean
  isSelling?: boolean
  action?: string
}

export type CurrencyExchangePaginator = PaginationResponse<CurrencyExchangeList>
