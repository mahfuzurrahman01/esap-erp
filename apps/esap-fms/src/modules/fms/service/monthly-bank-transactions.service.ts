import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"
import { MonthlyBankTransactionsPaginator, MonthlyBankTransactionsQueryOptions } from "../types/monthly-bank-transactions"

export const monthlyBankTransactionsService = {
  all: (params: Partial<MonthlyBankTransactionsQueryOptions>) => {
    return HttpClient.get<MonthlyBankTransactionsPaginator>(
      ApiEndpoint.fms.monthlyBankTransactions,
      params,
      EndpointType.FMS
    )
  },
}
