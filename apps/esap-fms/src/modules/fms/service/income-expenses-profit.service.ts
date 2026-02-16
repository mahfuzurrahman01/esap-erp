import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { IncomeExpensesProfitResponse } from "../types/income-expenses-profit"

export const IncomeExpensesProfitService = {
  all: async () => {
    const response = await HttpClient.get<IncomeExpensesProfitResponse>(
      ApiEndpoint.fms.topCompanyIncome,
      undefined,
      EndpointType.FMS
    )
    return response
  },
}
