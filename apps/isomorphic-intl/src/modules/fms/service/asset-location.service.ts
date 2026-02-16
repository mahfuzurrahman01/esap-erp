import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AssetLocationList,
  AssetLocationPaginator,
  AssetLocationQueryOptions,
} from "../types"

export const AssetLocationService = {
  all: (params: Partial<AssetLocationQueryOptions>) => {
    return HttpClient.get<AssetLocationPaginator>(
      ApiEndpoint.fms.assetLocation,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetLocationList>(
      ApiEndpoint.fms.assetLocationById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetLocationList) =>
    HttpClient.post<AssetLocationList>(
      ApiEndpoint.fms.createAssetLocation,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: AssetLocationList) =>
    HttpClient.put<AssetLocationList>(
      ApiEndpoint.fms.updateAssetLocation,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetLocationList>(
      ApiEndpoint.fms.deleteAssetLocation(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetLocationList>(
      ApiEndpoint.fms.bulkAssetLocation,
      input,
      ApiBase.FMS
    ),
}
