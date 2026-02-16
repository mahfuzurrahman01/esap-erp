import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  BankAccountList,
  BankAccountPaginator,
  BankAccountQueryOptions,
} from "../types/bank-account"

export const BankAccountService = {
  all: (params: Partial<BankAccountQueryOptions>) => {
    return HttpClient.get<BankAccountPaginator>(
      ApiEndpoint.fms.bankAccount,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankAccountList>(ApiEndpoint.fms.bankAccountById(id), undefined, EndpointType.FMS),
  create: (input: BankAccountList) =>
    HttpClient.post<BankAccountList>(ApiEndpoint.fms.createBankAccount, input, false, EndpointType.FMS),
  update: (id: number, input: BankAccountList) =>
    HttpClient.put<BankAccountList>(
      ApiEndpoint.fms.updateBankAccount,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankAccountList>(ApiEndpoint.fms.deleteBankAccount(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankAccountList>(
      ApiEndpoint.fms.bulkBankAccount,
      ids,
      EndpointType.FMS
    ),
}
