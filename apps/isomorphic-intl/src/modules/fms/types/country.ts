import { PaginationResponse, QueryOptions } from "./index"

export interface CountryQueryOptions extends QueryOptions {
  search?: string
  sort?: string
}

export interface CountryList {
  id?: number
  countryName: string
  countryCode?: string
  dateFormat?: string
  timeFormat?: string
  timeZone?: string
  createdDate?: string
  updatedDate?: string
  actions?: string
}

export type CountryPaginator = PaginationResponse<CountryList>
