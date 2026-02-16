import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  CurrencyExchangeList,
  CurrencyExchangePaginator,
  CurrencyExchangeQueryOptions,
} from "../types/currency-exchange"

export const CurrencyExchangeService = {
  all: (params: Partial<CurrencyExchangeQueryOptions>) => {
    return HttpClient.get<CurrencyExchangePaginator>(
      ApiEndpoint.fms.currencyExchange,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CurrencyExchangeList>(
      ApiEndpoint.fms.currencyExchangeById(id), undefined,
      EndpointType.FMS,
    ),
  create: (input: CurrencyExchangeList) =>
    HttpClient.post<CurrencyExchangeList>(
      ApiEndpoint.fms.createCurrencyExchange,
      input,
      false,
      EndpointType.FMS
    ),
  update: (id: number, input: CurrencyExchangeList) =>
    HttpClient.put<CurrencyExchangeList>(
      ApiEndpoint.fms.updateCurrencyExchange,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CurrencyExchangeList>(
      ApiEndpoint.fms.deleteCurrencyExchange(id), EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CurrencyExchangeList>(
      ApiEndpoint.fms.bulkCurrencyExchange,
      ids, EndpointType.FMS
    ),
}
