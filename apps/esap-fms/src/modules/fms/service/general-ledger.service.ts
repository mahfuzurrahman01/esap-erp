import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  GeneralLedgerQueryOptions,
  GeneralLedgerResponse,
} from "../types/general-ledger"

export const GeneralLedgerService = {
  all: (params: Partial<GeneralLedgerQueryOptions>) => {
    return HttpClient.get<GeneralLedgerResponse>(
      ApiEndpoint.fms.generalLedger,
      params,
      EndpointType.FMS
    )
  },
}
