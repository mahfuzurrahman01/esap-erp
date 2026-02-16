import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetRepairList>(
      ApiEndpoint.fms.assetRepairById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetRepairList) =>
    HttpClient.post<AssetRepairList>(
      ApiEndpoint.fms.createAssetRepair,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: AssetRepairList) =>
    HttpClient.put<AssetRepairList>(
      ApiEndpoint.fms.updateAssetRepair,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetRepairList>(
      ApiEndpoint.fms.deleteAssetRepair(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetRepairList>(
      ApiEndpoint.fms.bulkAssetRepair,
      input,
      EndpointType.FMS
    ),
}
