import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetMaintenanceList>(
      ApiEndpoint.fms.assetMaintenanceById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetMaintenanceList) =>
    HttpClient.post<AssetMaintenanceList>(
      ApiEndpoint.fms.createAssetMaintenance,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: AssetMaintenanceList) =>
    HttpClient.put<AssetMaintenanceList>(
      ApiEndpoint.fms.updateAssetMaintenance,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetMaintenanceList>(
      ApiEndpoint.fms.deleteAssetMaintenance(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetMaintenanceList>(
      ApiEndpoint.fms.bulkAssetMaintenance,
      input,
      EndpointType.FMS
    ),
}
