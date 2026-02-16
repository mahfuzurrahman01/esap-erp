import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ContractRenewal {
  id?: number
  supplierContractInfoId?: number
  startDate?: string
  endDate?: string
  status?: boolean
}

export interface ContractRenewalQueryOptions extends QueryOptions {}

export type ContractRenewalPaginator = PaginatedResponse<ContractRenewal>
