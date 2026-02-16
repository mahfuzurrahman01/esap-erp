import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { BankList, BankPaginator, BankQueryOptions } from "../types/bank"

export const BankService = {
  all: (params: Partial<BankQueryOptions>) => {
    return HttpClient.get<BankPaginator>(ApiEndpoint.fms.bank, params, EndpointType.FMS)
  },
  get: (id: number) => HttpClient.get<BankList>(ApiEndpoint.fms.bankById(id), undefined,
  EndpointType.FMS),
  create: (input: BankList) =>
    HttpClient.post<BankList>(ApiEndpoint.fms.createBank, input, false,
      EndpointType.FMS),
  update: (id: number, input: BankList) =>
    HttpClient.put<BankList>(ApiEndpoint.fms.updateBank, input, false,
  EndpointType.FMS),
  delete: (id: number) =>
    HttpClient.delete<BankList>(ApiEndpoint.fms.deleteBank(id), EndpointType.FMS),
  
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankList>(ApiEndpoint.fms.bulkBank, ids, EndpointType.FMS),
}
