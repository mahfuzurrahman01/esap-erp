import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<BankAccountTypeList>(
      ApiEndpoint.fms.bankAccountTypeById(id), undefined,
      EndpointType.FMS
    ),
  create: (input: BankAccountTypeList) =>
    HttpClient.post<BankAccountTypeList>(
      ApiEndpoint.fms.createBankAccountType,
      input, false,
      EndpointType.FMS
    ),
  update: (id: number, input: BankAccountTypeList) =>
    HttpClient.put<BankAccountTypeList>(
      ApiEndpoint.fms.updateBankAccountType,
      input, false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankAccountTypeList>(
      ApiEndpoint.fms.deleteBankAccountType(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankAccountTypeList>(
      ApiEndpoint.fms.bulkBankAccountType,
      ids,
      EndpointType.FMS
    ),
}
