import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  BankTransactionList,
  BankTransactionPaginator,
  BankTransactionQueryOptions,
} from "../types/bank-transaction"

export const BankTransactionService = {
  all: (params: Partial<BankTransactionQueryOptions>) => {
    return HttpClient.get<BankTransactionPaginator>(
      ApiEndpoint.fms.bankTransaction,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankTransactionList>(
      ApiEndpoint.fms.bankTransactionById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: BankTransactionList) =>
    HttpClient.post<BankTransactionList>(
      ApiEndpoint.fms.createBankTransaction,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: BankTransactionList) =>
    HttpClient.put<BankTransactionList>(
      ApiEndpoint.fms.updateBankTransaction,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankTransactionList>(
      ApiEndpoint.fms.deleteBankTransaction(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]): Promise<any> =>
    HttpClient.bulkDelete<BankTransactionList>(
      ApiEndpoint.fms.bulkBankTransaction,
      ids,
      EndpointType.FMS
    ),
}
