import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { BankAccountSummaryPaginator, BankAccountSummaryQueryOptions } from "../types/bank-account-summary"

export const bankAccountSummaryService = {
  all: (params: Partial<BankAccountSummaryQueryOptions>) => {
    return HttpClient.get<BankAccountSummaryPaginator>(
      ApiEndpoint.fms.bankAccountSummary,
      params,
      EndpointType.FMS
    )
  },
}
