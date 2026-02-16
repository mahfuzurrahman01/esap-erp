import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  AssetMovementList,
  AssetMovementPaginator,
  AssetMovementQueryOptions,
} from "../types"

export const AssetMovementService = {
  all: (params: Partial<AssetMovementQueryOptions>) => {
    return HttpClient.get<AssetMovementPaginator>(
      ApiEndpoint.fms.assetMovement,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetMovementList>(
      ApiEndpoint.fms.assetMovementById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AssetMovementList) =>
    HttpClient.post<AssetMovementList>(
      ApiEndpoint.fms.createAssetMovement,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: AssetMovementList) =>
    HttpClient.put<AssetMovementList>(
      ApiEndpoint.fms.updateAssetMovement,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetMovementList>(
      ApiEndpoint.fms.deleteAssetMovement(id),
      EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetMovementList>(
      ApiEndpoint.fms.bulkAssetMovement,
      input,
      EndpointType.FMS
    ),
}
