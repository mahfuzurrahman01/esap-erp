import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { IncomeExpensesProfitResponse } from "../types/income-expenses-profit"
import { TopBankAccountList } from "../types/top-bank-account"

export const IncomeExpensesProfitService = {
  all: (params: Partial<IncomeExpensesProfitResponse>) => {
    return HttpClient.get<IncomeExpensesProfitResponse>(
      ApiEndpoint.fms.topCompanyIncome,
      params,
      ApiBase.FMS
    )
  },
}
