import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { CashFlowQueryOptions, CashFlowResponse } from "../types/cash-flow"

export const CashFlowService = {
  get: (params: CashFlowQueryOptions) => {
    return HttpClient.get<CashFlowResponse>(
      ApiEndpoint.fms.cashFlow,
      params,
      ApiBase.FMS
    )
  },
}
