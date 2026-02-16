import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { AssetList, AssetPaginator, AssetQueryOptions } from "../types"

export const AssetService = {
  all: (params: Partial<AssetQueryOptions>) => {
    return HttpClient.get<AssetPaginator>(
      ApiEndpoint.fms.asset,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetList>(
      ApiEndpoint.fms.assetById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetList) =>
    HttpClient.post<AssetList>(
      ApiEndpoint.fms.createAsset,
      input,
      true,
      EndpointType.FMS
    ),
  update: (input: AssetList) =>
    HttpClient.put<AssetList>(
      ApiEndpoint.fms.updateAsset,
      input,
      true,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetList>(
      ApiEndpoint.fms.deleteAsset(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetList>(
      ApiEndpoint.fms.bulkAsset,
      input,
      EndpointType.FMS
    ),
  checkProductAsset: (productId: number) =>
    HttpClient.get<boolean>(
      ApiEndpoint.fms.checkProductAsset(productId),
      undefined,
      EndpointType.FMS
    ),
  getAssetWithoutMovement: (params: Partial<AssetQueryOptions>) => {
    return HttpClient.get<AssetPaginator>(
      ApiEndpoint.fms.getAssetWithoutMovement,
      params,
      EndpointType.FMS
    )
  },
}
