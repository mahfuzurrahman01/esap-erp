import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { CashFlowResponse } from "../types/cash-flow-summary"
import { CashFlowQueryOptions } from "../types/cash-flow"

export const CashFlowSummaryService = {
  all: (params: Partial<CashFlowQueryOptions>) => {
    return HttpClient.get<CashFlowResponse>(
      ApiEndpoint.fms.cashFlowSummary,
      params,
      EndpointType.FMS
    )
  },
}
