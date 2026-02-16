import { ApiEndpoint as ApiRoutes } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { TopBankAccountList, TopBankAccountQueryOptions } from "../types"

export const TopBankAccountService = {
  all: (params: Partial<TopBankAccountQueryOptions>) => {
    return HttpClient.get<TopBankAccountList>(
      ApiRoutes.fms.topBankAccount,
      params,
      ApiBase.FMS
    )
  },
}
