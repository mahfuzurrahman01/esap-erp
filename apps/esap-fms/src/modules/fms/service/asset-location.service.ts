import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetLocationList>(
      ApiEndpoint.fms.assetLocationById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetLocationList) =>
    HttpClient.post<AssetLocationList>(
      ApiEndpoint.fms.createAssetLocation,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: AssetLocationList) =>
    HttpClient.put<AssetLocationList>(
      ApiEndpoint.fms.updateAssetLocation,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetLocationList>(
      ApiEndpoint.fms.deleteAssetLocation(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetLocationList>(
      ApiEndpoint.fms.bulkAssetLocation,
      input,
      EndpointType.FMS
    ),
}
