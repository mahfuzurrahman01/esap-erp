import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  AssetCategoryList,
  AssetCategoryPaginator,
  AssetCategoryQueryOptions,
} from "../types"

export const AssetCategoryService = {
  all: (params: Partial<AssetCategoryQueryOptions>) => {
    return HttpClient.get<AssetCategoryPaginator>(
      ApiEndpoint.fms.assetCategory,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetCategoryList>(
      ApiEndpoint.fms.assetCategoryById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetCategoryList) =>
    HttpClient.post<AssetCategoryList>(
      ApiEndpoint.fms.createAssetCategory,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: AssetCategoryList) =>
    HttpClient.put<AssetCategoryList>(
      ApiEndpoint.fms.updateAssetCategory,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetCategoryList>(
      ApiEndpoint.fms.deleteAssetCategory(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetCategoryList>(
      ApiEndpoint.fms.bulkAssetCategory,
      input,
      EndpointType.FMS
    ),
}
