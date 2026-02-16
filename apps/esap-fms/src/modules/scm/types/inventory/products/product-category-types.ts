import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ProductCategory {
  createdBy?: string
  createdDate?: Date
  updatedBy?: string
  updatedDate?: Date
  id?: number
  name: string
  description?: string
  remarks?: string
  imageUrl?: string
}

export interface ProductCategoryQueryOptions extends QueryOptions {}

export type ProductCategoryPaginator = PaginatedResponse<ProductCategory>
