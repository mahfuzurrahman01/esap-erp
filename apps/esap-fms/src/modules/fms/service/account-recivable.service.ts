import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"
import { AccountRecivablePaginator, AccountRecivableQueryOptions } from "../types/account-recivable"

export const accountRecivable = {
  all: (params: Partial<AccountRecivableQueryOptions>) =>
    httpClient.get<AccountRecivablePaginator>(ApiEndpoint.crm.accountRecivableReport, params),
}
