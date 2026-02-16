import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AssetMovementList>(
      ApiEndpoint.fms.assetMovementById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AssetMovementList) =>
    HttpClient.post<AssetMovementList>(
      ApiEndpoint.fms.createAssetMovement,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: AssetMovementList) =>
    HttpClient.put<AssetMovementList>(
      ApiEndpoint.fms.updateAssetMovement,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AssetMovementList>(
      ApiEndpoint.fms.deleteAssetMovement(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<AssetMovementList>(
      ApiEndpoint.fms.bulkAssetMovement,
      input,
      ApiBase.FMS
    ),
}
