import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BankAccountTypeList,
  BankAccountTypePaginator,
  BankAccountTypeQueryOptions,
} from "../types/bank-account-types"

export const BankAccountTypeService = {
  all: (params: Partial<BankAccountTypeQueryOptions>) => {
    return HttpClient.get<BankAccountTypePaginator>(
      ApiEndpoint.fms.bankAccountType,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankAccountTypeList>(
      ApiEndpoint.fms.bankAccountTypeById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BankAccountTypeList) =>
    HttpClient.post<BankAccountTypeList>(
      ApiEndpoint.fms.createBankAccountType,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: BankAccountTypeList) =>
    HttpClient.put<BankAccountTypeList>(
      ApiEndpoint.fms.updateBankAccountType,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankAccountTypeList>(
      ApiEndpoint.fms.deleteBankAccountType(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankAccountTypeList>(
      ApiEndpoint.fms.bulkBankAccountType,
      ids,
      ApiBase.FMS
    ),
}
