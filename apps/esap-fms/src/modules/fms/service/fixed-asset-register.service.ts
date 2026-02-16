import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  FixedAssetRegisterPaginator,
  FixedAssetRegisterQueryOptions,
} from "../types"

export const FixedAssetRegisterService = {
  all: (params: Partial<FixedAssetRegisterQueryOptions>) => {
    return HttpClient.get<FixedAssetRegisterPaginator>(
      ApiEndpoint.fms.fixedAssetRegister,
      params,
      EndpointType.FMS
    )
  },
}
