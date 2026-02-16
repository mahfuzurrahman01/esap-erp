import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface BillOfMaterialsVersion {
  createdDate?: string
  updatedDate?: string
  id?: number
  billOfMaterialId?: number
  versionNumber?: string
  effectiveDate?: string
  versionDate?: string
}

export interface BillOfMaterialsVersionQueryOptions extends QueryOptions {}

export type BillOfMaterialsVersionPaginator =
  PaginatedResponse<BillOfMaterialsVersion>
