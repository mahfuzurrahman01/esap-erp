import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface WorkCenter {
  createdDate?: string
  updatedDate?: string
  id?: number
  workCenterName?: string
  location?: string
  capacity?: number
}

export interface WorkCenterQueryOptions extends QueryOptions {}

export type WorkCenterPaginator = PaginatedResponse<WorkCenter>
