import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AssetMaintenanceList,
  AssetMaintenancePaginator,
  AssetMaintenanceQueryOptions,
} from "../types"

export const AssetMaintenanceService = {
  all: (params: Partial<AssetMaintenanceQueryOptions>) => {
    return HttpClient.get<AssetMaintenancePaginator>(
      ApiEndpoint.fms.assetMaintenance,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetMaintenanceList>(
      ApiEndpoint.fms.assetMaintenanceById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetMaintenanceList) =>
    HttpClient.post<AssetMaintenanceList>(
      ApiEndpoint.fms.createAssetMaintenance,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: AssetMaintenanceList) =>
    HttpClient.put<AssetMaintenanceList>(
      ApiEndpoint.fms.updateAssetMaintenance,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetMaintenanceList>(
      ApiEndpoint.fms.deleteAssetMaintenance(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetMaintenanceList>(
      ApiEndpoint.fms.bulkAssetMaintenance,
      input,
      ApiBase.FMS
    ),
}
