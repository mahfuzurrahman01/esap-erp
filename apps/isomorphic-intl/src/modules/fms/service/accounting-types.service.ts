import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  AccountTypeList,
  AccountTypePaginator,
  AccountTypeQueryOptions,
} from "../types/accounting-types"

export const AccountingTypesService = {
  all: (params: Partial<AccountTypeQueryOptions>) => {
    return HttpClient.get<AccountTypePaginator>(
      ApiEndpoint.fms.accountTypes,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AccountTypeList>(
      ApiEndpoint.fms.accountTypeById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: AccountTypeList) =>
    HttpClient.post<AccountTypeList>(
      ApiEndpoint.fms.createAccountType,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: AccountTypeList) =>
    HttpClient.put<AccountTypeList>(
      ApiEndpoint.fms.updateAccountType,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<AccountTypeList>(
      ApiEndpoint.fms.deleteAccountType(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<AccountTypeList>(
      ApiEndpoint.fms.useBulkDeleteAccountType,
      ids,
      ApiBase.FMS
    ),
}
