export interface AssetMovementHistoryQueryOptions {
  startDate?: string
  endDate?: string
  purposeOfMovement?: string
}

export interface AssetMovementHistory {
  sl: number
  assetCode: string
  movementCode: string
  fromLocation: string
  toLocation: string
  movementDate: string
  purposeOfMovement: string
  handledBy: string
}