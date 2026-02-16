import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { BankList, BankPaginator, BankQueryOptions } from "../types/bank"

export const BankService = {
  all: (params: Partial<BankQueryOptions>) => {
    return HttpClient.get<BankPaginator>(
      ApiEndpoint.fms.bank,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankList>(
      ApiEndpoint.fms.bankById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BankList) =>
    HttpClient.post<BankList>(
      ApiEndpoint.fms.createBank,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: BankList) =>
    HttpClient.put<BankList>(
      ApiEndpoint.fms.updateBank,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankList>(
      ApiEndpoint.fms.deleteBank(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankList>(
      ApiEndpoint.fms.bulkBank,
      ids,
      ApiBase.FMS
    ),
}
