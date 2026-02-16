import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  AssetDepreciationList,
  AssetDepreciationPaginator,
  AssetDepreciationQueryOptions,
} from "../types"

export const AssetDepreciationService = {
  all: (params: Partial<AssetDepreciationQueryOptions>) => {
    return HttpClient.get<AssetDepreciationPaginator>(
      ApiEndpoint.fms.assetDepreciationSchedule,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetDepreciationList>(
      ApiEndpoint.fms.assetDepreciationScheduleById(id),
      undefined,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetDepreciationList>(
      ApiEndpoint.fms.deleteAssetDepreciationSchedule(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetDepreciationList>(
      ApiEndpoint.fms.bulkAssetDepreciationSchedule,
      input,
      EndpointType.FMS
    ),
}
