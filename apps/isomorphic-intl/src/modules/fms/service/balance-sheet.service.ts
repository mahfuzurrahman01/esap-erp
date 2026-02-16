import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BalanceSheetQueryOptions,
  BalanceSheetResponse,
} from "../types/balance-sheet"

export const BalanceSheetService = {
  all: (params: Partial<BalanceSheetQueryOptions>) => {
    return HttpClient.get<BalanceSheetResponse>(
      ApiEndpoint.fms.balanceSheet,
      params,
      ApiBase.FMS
    )
  },
}
