import {
  CurrencyList,
  CurrencyPaginator,
  CurrencyQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const CurrencyService = {
  all: (params: Partial<CurrencyQueryOptions>) => {
    return HttpClient.get<CurrencyPaginator>(
      ApiEndpoint.fms.currency,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CurrencyList>(
      ApiEndpoint.fms.currencyById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: CurrencyList) =>
    HttpClient.post<CurrencyList>(
      ApiEndpoint.fms.createCurrency,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: CurrencyList) =>
    HttpClient.put<CurrencyList>(
      ApiEndpoint.fms.updateCurrency,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CurrencyList>(
      ApiEndpoint.fms.deleteCurrency(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CurrencyList>(
      ApiEndpoint.fms.bulkCurrency,
      ids,
      ApiBase.FMS
    ),
}
