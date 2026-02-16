import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AssetRepairList,
  AssetRepairPaginator,
  AssetRepairQueryOptions,
} from "../types"

export const AssetRepairService = {
  all: (params: Partial<AssetRepairQueryOptions>) => {
    return HttpClient.get<AssetRepairPaginator>(
      ApiEndpoint.fms.assetRepair,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetRepairList>(
      ApiEndpoint.fms.assetRepairById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetRepairList) =>
    HttpClient.post<AssetRepairList>(
      ApiEndpoint.fms.createAssetRepair,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: AssetRepairList) =>
    HttpClient.put<AssetRepairList>(
      ApiEndpoint.fms.updateAssetRepair,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetRepairList>(
      ApiEndpoint.fms.deleteAssetRepair(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetRepairList>(
      ApiEndpoint.fms.bulkAssetRepair,
      input,
      ApiBase.FMS
    ),
}
