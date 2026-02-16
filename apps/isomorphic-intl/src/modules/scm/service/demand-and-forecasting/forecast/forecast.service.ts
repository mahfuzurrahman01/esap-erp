import {
  Forecast,
  ForecastPaginator,
  ForecastQueryOptions,
} from "@/modules/scm/types/demand-and-forecasting/forecast/forecast-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ForecastService = {
  all: (params?: Partial<ForecastQueryOptions>) => {
    return HttpClient.get<ForecastPaginator>(
      ApiEndpoint.scm.getAllForecasting,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<Forecast>(ApiEndpoint.scm.getForecastingById(id)),
  create: (input: Forecast) =>
    HttpClient.post<Forecast>(ApiEndpoint.scm.createForecasting, input),
  update: (input: Forecast) =>
    HttpClient.put<Forecast>(ApiEndpoint.scm.updateForecasting, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteForecasting(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteForecasting, ids)
  },
}
