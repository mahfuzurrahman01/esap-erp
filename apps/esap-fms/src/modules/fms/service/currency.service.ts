import {
  CurrencyList,
  CurrencyPaginator,
  CurrencyQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const CurrencyService = {
  all: (params: Partial<CurrencyQueryOptions>) => {
    return HttpClient.get<CurrencyPaginator>(
      ApiEndpoint.fms.currency,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CurrencyList>(
      ApiEndpoint.fms.currencyById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: CurrencyList) =>
    HttpClient.post<CurrencyList>(
      ApiEndpoint.fms.createCurrency,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: CurrencyList) =>
    HttpClient.put<CurrencyList>(
      ApiEndpoint.fms.updateCurrency,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CurrencyList>(
      ApiEndpoint.fms.deleteCurrency(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CurrencyList>(
      ApiEndpoint.fms.bulkCurrency,
      ids,
      EndpointType.FMS
    ),
}
