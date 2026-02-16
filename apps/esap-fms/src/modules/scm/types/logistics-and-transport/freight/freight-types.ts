import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Freight {
  createdDate?: string
  updatedDate?: string
  id?: number
  shipmentId?: number
  carrierId?: number
  carrierName?: string
  origin?: string
  destination?: string
  routeStart?: string
  routeEnd?: string
  transitCost?: number
}

export interface FreightQueryOptions extends QueryOptions {
  carrierName?: string
  origin?: string
  destination?: string
}

export type FreightPaginator = PaginatedResponse<Freight>
