import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BudgetVarianceQueryOptions,
  BudgetVarianceResponse,
} from "../types/budget-variance"

export const BudgetVarianceService = {
  get: (params: Partial<BudgetVarianceQueryOptions>) => {
    return HttpClient.get<BudgetVarianceResponse>(
      ApiEndpoint.fms.budgetVariance,
      params,
      ApiBase.FMS
    )
  },
}
