import { CompanyList, PaginationResponse } from "./index"

export interface CostCenterQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  companyId?: number | string
  status?: boolean | string
  sort?: string
}

export interface CostCenterList {
  id?: number
  costCenterName: string
  companyId: number
  company?: CompanyList | null
  isActive?: boolean
  actions?: string
}

export type CostCenterPaginator = PaginationResponse<CostCenterList>
