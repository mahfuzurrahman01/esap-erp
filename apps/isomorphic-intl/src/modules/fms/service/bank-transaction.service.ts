import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankTransactionList>(
      ApiEndpoint.fms.bankTransactionById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BankTransactionList) =>
    HttpClient.post<BankTransactionList>(
      ApiEndpoint.fms.createBankTransaction,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: BankTransactionList) =>
    HttpClient.put<BankTransactionList>(
      ApiEndpoint.fms.updateBankTransaction,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankTransactionList>(
      ApiEndpoint.fms.deleteBankTransaction(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]): Promise<any> =>
    HttpClient.bulkDelete<BankTransactionList>(
      ApiEndpoint.fms.bulkBankTransaction,
      ids,
      ApiBase.FMS
    ),
}
