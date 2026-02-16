import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  AssetRepairHistory,
  AssetRepairHistoryQueryOptions,
} from "../types"

export const AssetRepairHistoryService = {
  all: (query?: AssetRepairHistoryQueryOptions) => {
    const params = new URLSearchParams()
    
    if (query) {
      if (query.startDate)
        params.append("startDate", query.startDate)
      if (query.endDate)
        params.append("endDate", query.endDate)
      if (query.repairStatus)
        params.append("repairStatus", query.repairStatus)
    }

    const url = params.toString() 
      ? `${ApiEndpoint.fms.assetRepairHistory}?${params.toString()}`
      : ApiEndpoint.fms.assetRepairHistory

    return HttpClient.get<AssetRepairHistory[]>(
      url,
      undefined,
      EndpointType.FMS
    )
  },
}
