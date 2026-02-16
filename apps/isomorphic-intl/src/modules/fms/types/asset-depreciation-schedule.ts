import {
  AssetList,
  CompanyList,
  JournalEntryList,
  PaginationResponse,
} from "./index"

export interface AssetDepreciationQueryOptions {
  pageIndex?: number
  pageSize?: number
  search?: string
  status?: boolean
  sort?: string
}

export interface DepreciationSchedule {
  scheduleDate?: string
  depreciationAmount?: number
  accumulatedDepreciationAmount?: number
  journalId?: number
  journal?: JournalEntryList | null
  isJournalCreated?: boolean
}

export interface AssetDepreciationList {
  id?: number
  assetDepreciationSerialNumber?: string
  assetId: number
  asset?: AssetList | null
  assetSerialNumber?: string
  financeBookId?: number
  financeBookName: string
  companyId: number
  company?: CompanyList | null
  depreciationMethod?: string
  totalDepreciationPeriod?: number
  frequencyOfDepreciation?: number
  expectedValue?: number
  assetDepreciationSchedules?: DepreciationSchedule[]
  assetStatus?: string
  actions?: string
}

export type AssetDepreciationPaginator =
  PaginationResponse<AssetDepreciationList>
