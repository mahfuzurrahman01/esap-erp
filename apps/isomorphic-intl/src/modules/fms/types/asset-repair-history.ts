
export interface AssetRepairHistoryQueryOptions {
  startDate?: string
  endDate?: string
  repairStatus?: string
}

export interface AssetRepairHistory {
  sl: number
  assetCode: string
  assetRepairCode: string
  repairDate: string
  repairDescription: string
  downTime: number
  repairCost: string
  repairStatus: string
}