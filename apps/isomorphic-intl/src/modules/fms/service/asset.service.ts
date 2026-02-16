import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { AssetList, AssetPaginator, AssetQueryOptions } from "../types"

export const AssetService = {
  all: (params: Partial<AssetQueryOptions>) => {
    return HttpClient.get<AssetPaginator>(
      ApiEndpoint.fms.asset,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetList>(
      ApiEndpoint.fms.assetById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetList) =>
    HttpClient.post<AssetList>(
      ApiEndpoint.fms.createAsset,
      input,
      true,
      ApiBase.FMS
    ),
  update: (input: AssetList) =>
    HttpClient.put<AssetList>(
      ApiEndpoint.fms.updateAsset,
      input,
      true,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetList>(ApiEndpoint.fms.deleteAsset(id), ApiBase.FMS),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetList>(
      ApiEndpoint.fms.bulkAsset,
      input,
      ApiBase.FMS
    ),
  checkProductAsset: (productId: number) =>
    HttpClient.get<boolean>(
      ApiEndpoint.fms.checkProductAsset(productId),
      undefined,
      ApiBase.FMS
    ),
  getAssetWithoutMovement: (params: Partial<AssetQueryOptions>) => {
    return HttpClient.get<AssetPaginator>(
      ApiEndpoint.fms.getAssetWithoutMovement,
      params,
      ApiBase.FMS
    )
  },
}
