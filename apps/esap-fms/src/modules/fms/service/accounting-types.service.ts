import {
  AccountTypeList,
  AccountTypePaginator,
  AccountTypeQueryOptions,
} from "../types/accounting-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const AccountingTypesService = {
  all: (params: Partial<AccountTypeQueryOptions>) => {
    return HttpClient.get<AccountTypePaginator>(
      ApiEndpoint.fms.accountTypes,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<AccountTypeList>(
      ApiEndpoint.fms.accountTypeById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: AccountTypeList) =>
    HttpClient.post<AccountTypeList>(
      ApiEndpoint.fms.createAccountType,
      input,
      false,
      EndpointType.FMS
    ),
  update: (id: number, input: AccountTypeList) =>
    HttpClient.put<AccountTypeList>(
      ApiEndpoint.fms.updateAccountType,
      input,
      false,
      EndpointType.FMS
    ),
    delete: (id: number) =>
      HttpClient.delete<AccountTypeList>(
        ApiEndpoint.fms.deleteAccountType(id),
        EndpointType.FMS
      ),
    bulk: (ids: number[]) =>
      HttpClient.bulkDelete<AccountTypeList>(
        ApiEndpoint.fms.useBulkDeleteAccountType,
        ids,
        EndpointType.FMS
      ),
}
