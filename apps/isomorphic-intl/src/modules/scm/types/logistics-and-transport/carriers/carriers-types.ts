import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Carrier {
  createdDate?: string
  updatedDate?: string
  id?: number
  carrierName?: string
  phone?: string
  email?: string
  address?: string
}

export interface CarrierQueryOptions extends QueryOptions {}

export type CarrierPaginator = PaginatedResponse<Carrier>
