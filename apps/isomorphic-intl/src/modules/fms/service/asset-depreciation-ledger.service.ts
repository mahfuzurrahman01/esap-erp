import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AssetDepreciationLedgerPaginator,
  AssetDepreciationLedgerQueryOptions,
} from "../types"

export const AssetDepreciationLedgerService = {
  all: (params: Partial<AssetDepreciationLedgerQueryOptions>) => {
    return HttpClient.get<AssetDepreciationLedgerPaginator>(
      ApiEndpoint.fms.assetDepreciationLedger,
      params,
      ApiBase.FMS
    )
  },
}
