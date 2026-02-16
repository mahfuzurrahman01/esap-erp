import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  BudgetSummaryQueryOptions,
  BudgetSummaryResponse,
} from "../types/budget-summary"

export const BudgetSummaryService = {
  all: (params: Partial<BudgetSummaryQueryOptions>) => {
    return HttpClient.get<BudgetSummaryResponse>(
      ApiEndpoint.fms.budgetSummary,
      params,
      EndpointType.FMS
    )
  },
}
