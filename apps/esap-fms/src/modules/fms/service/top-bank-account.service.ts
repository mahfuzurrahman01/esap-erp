import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { TopBankAccountList, TopBankAccountQueryOptions } from "../types"

export const TopBankAccountService = {
  all: (params: Partial<TopBankAccountQueryOptions>) => {
    return HttpClient.get<TopBankAccountList>(
      ApiEndpoint.fms.topBankAccount,
      params,
      EndpointType.FMS
    )
  },

}
