import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ItemUnit {
  createdDate?: string
  updatedDate?: string
  id?: number
  name?: string
  description?: string
  remarks?: string
}

export interface ItemUnitQueryOptions extends QueryOptions {}

export type ItemUnitPaginator = PaginatedResponse<ItemUnit>
