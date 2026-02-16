import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  CompanyWiseProfitQueryOptions,
  CompanyWiseProfitResponse,
} from "../types/company-wise-profit"

export const CompanyWiseProfitService = {
  all: async (query?: Partial<CompanyWiseProfitQueryOptions>) => {
    const params = new URLSearchParams()

    if (query?.companyId) {
      params.append("companyId", query.companyId.toString())
    }

    const url = params.toString()
      ? `${ApiEndpoint.fms.companyWiseProfit}?${params.toString()}`
      : ApiEndpoint.fms.companyWiseProfit

    return HttpClient.get<CompanyWiseProfitResponse>(
      url,
      undefined,
      EndpointType.FMS
    )
  },
}
