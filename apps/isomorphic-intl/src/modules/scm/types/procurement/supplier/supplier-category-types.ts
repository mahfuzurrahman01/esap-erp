import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface SupplierCategory {
  id?: number
  name: string
  description: string
  status?: boolean
}

export interface SupplierCategoryQueryOptions extends QueryOptions {}

export type SupplierCategoryPaginator = PaginatedResponse<SupplierCategory>
