import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BankClearance,
  BankClearanceQueryOptions,
  UpdateBankClearance,
} from "../types"

export const BankClearanceService = {
  all: (query?: BankClearanceQueryOptions) => {
    const params = new URLSearchParams()
    if (query?.bankAccountId)
      params.append("bankAccountId", query.bankAccountId.toString())
    if (query?.chartOfAccountId)
      params.append("chartOfAccountId", query.chartOfAccountId.toString())

    return HttpClient.get<BankClearance[]>(
      `${ApiEndpoint.fms.bankClearance}?${params.toString()}`,
      undefined,
      ApiBase.FMS
    )
  },
  update: (input: UpdateBankClearance) =>
    HttpClient.patch<BankClearance>(
      ApiEndpoint.fms.updateBankClearanceStatus,
      input,
      false,
      ApiBase.FMS
    ),
  updateBatch: (input: UpdateBankClearance[]) =>
    HttpClient.patch<BankClearance[]>(
      ApiEndpoint.fms.updateBankClearanceStatusBatch,
      input,
      false,
      ApiBase.FMS
    ),
}
