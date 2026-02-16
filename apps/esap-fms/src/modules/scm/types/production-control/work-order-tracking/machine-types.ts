import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Machine {
  createdDate?: string
  updatedDate?: string
  id?: number
  machineName?: string
  description?: string
  registerDate?: string
  expireDate?: string
  cost?: number
  status?: string
}

export interface MachineQueryOptions extends QueryOptions {}

export type MachinePaginator = PaginatedResponse<Machine>
