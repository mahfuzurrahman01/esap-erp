import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { CashFlowQueryOptions } from "../types/cash-flow"
import { CashFlowResponse } from "../types/cash-flow-summary"

export const CashFlowSummaryService = {
  all: (params: Partial<CashFlowQueryOptions>) => {
    return HttpClient.get<CashFlowResponse>(
      ApiEndpoint.fms.cashFlowSummary,
      params,
      ApiBase.FMS
    )
  },
}
