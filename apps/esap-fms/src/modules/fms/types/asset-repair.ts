import { AssetList, COAList, CompanyList, PaginationResponse } from "./index"

export interface AssetRepairQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  repairStatusId?: number
  sort?: string
}

export interface AssetRepairList {
  id?: number
  assetRepairSerialNumber?: string
  assetId: number
  asset?: AssetList | null
  assetSerialNumber?: string
  companyId: number
  company?: CompanyList | null
  failureDate: string
  completionDate: string
  repairDate: string
  purchaseInvoiceNo: string
  expenseAccountId: number
  expenseAccount?: COAList | null
  repairCost: number
  repairDescription: string
  repairStatus?: string
  actions?: string
}

export type AssetRepairPaginator = PaginationResponse<AssetRepairList>
