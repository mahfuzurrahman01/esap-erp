import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetDepreciationList>(
      ApiEndpoint.fms.assetDepreciationScheduleById(id),
      undefined,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetDepreciationList>(
      ApiEndpoint.fms.deleteAssetDepreciationSchedule(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetDepreciationList>(
      ApiEndpoint.fms.bulkAssetDepreciationSchedule,
      input,
      ApiBase.FMS
    ),
}
