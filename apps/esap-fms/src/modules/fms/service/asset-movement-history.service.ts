import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  AssetMovementHistory,
  AssetMovementHistoryQueryOptions,
} from "../types"

export const AssetMovementHistoryService = {
  all: (query?: AssetMovementHistoryQueryOptions) => {
    const params = new URLSearchParams()
    
    if (query) {
      if (query.startDate)
        params.append("startDate", query.startDate)
      if (query.endDate)
        params.append("endDate", query.endDate)
      if (query.purposeOfMovement)
        params.append("purposeOfMovement", query.purposeOfMovement)
    }

    const url = params.toString() 
      ? `${ApiEndpoint.fms.assetMovementHistory}?${params.toString()}`
      : ApiEndpoint.fms.assetMovementHistory

    return HttpClient.get<AssetMovementHistory[]>(
      url,
      undefined,
      EndpointType.FMS
    )
  },
}
