import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetCategoryList>(
      ApiEndpoint.fms.assetCategoryById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetCategoryList) =>
    HttpClient.post<AssetCategoryList>(
      ApiEndpoint.fms.createAssetCategory,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: AssetCategoryList) =>
    HttpClient.put<AssetCategoryList>(
      ApiEndpoint.fms.updateAssetCategory,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetCategoryList>(
      ApiEndpoint.fms.deleteAssetCategory(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetCategoryList>(
      ApiEndpoint.fms.bulkAssetCategory,
      input,
      ApiBase.FMS
    ),
}
