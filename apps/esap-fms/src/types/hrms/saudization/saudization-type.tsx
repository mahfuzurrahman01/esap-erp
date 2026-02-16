import { HRMSFetchQueryOptions } from "../common.types"

export type Saudization = {
  totalEmployees: number
  saudiEmployees: number
  expatriateEmployees: number
  saudiPercentage: number
  zone: string
}

export type SaudizationQueryOptions = HRMSFetchQueryOptions

type PaginatedResponse<T> = {
  pageIndex: number
  pageSize: number
  count: number
  data: T
}
export type SaudizationDataResponse = PaginatedResponse<Saudization>

export type SaudizationConfiguration = {
  to: string
  subject: string
  body: string
}
