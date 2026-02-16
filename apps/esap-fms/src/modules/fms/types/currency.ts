import { PaginationResponse, QueryOptions } from "./index"

export interface CurrencyQueryOptions extends QueryOptions {
  orderBy?: string
  sort?: string
  search?: string
}

export interface CurrencyList {
  id?: number
  currencyName: string
  symbol?: string
  fraction?: string
  units?: string
  smallValue?: string
  numberFormat?: string
  createdAt?: string
  updatedAt?: string
  actions?: string
}

export type CurrencyPaginator = PaginationResponse<CurrencyList>
