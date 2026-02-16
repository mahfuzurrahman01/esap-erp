import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CurrencyExchangeList>(
      ApiEndpoint.fms.currencyExchangeById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: CurrencyExchangeList) =>
    HttpClient.post<CurrencyExchangeList>(
      ApiEndpoint.fms.createCurrencyExchange,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: CurrencyExchangeList) =>
    HttpClient.put<CurrencyExchangeList>(
      ApiEndpoint.fms.updateCurrencyExchange,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CurrencyExchangeList>(
      ApiEndpoint.fms.deleteCurrencyExchange(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CurrencyExchangeList>(
      ApiEndpoint.fms.bulkCurrencyExchange,
      ids,
      ApiBase.FMS
    ),
}
