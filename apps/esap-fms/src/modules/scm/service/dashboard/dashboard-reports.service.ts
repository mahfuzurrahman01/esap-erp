import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

import {
  MonthlyForecast,
  MonthlyForecastQueryOptions,
} from "@/modules/scm/types/dashboard/monthly-forecast-types"
import { MainStaticCard } from "@/modules/scm/types/dashboard/main-static-card-types"
import { OtherStaticCard } from "@/modules/scm/types/dashboard/other-static-card"

export const DashboardReportsService = {
  getInvoiceMaterialCost: (params: Partial<any>) =>
    HttpClient.get<any>(ApiEndpoint.scm.getInvoiceMaterialCost, params),
  getTopSupplier: (params: Partial<any>) =>
    HttpClient.get<any>(ApiEndpoint.scm.getTopSupplier, params),
  getMostProducedProducts: (params: Partial<any>) =>
    HttpClient.get<any>(ApiEndpoint.scm.getMostProducedProducts, params),
  getMonthlyForecast: (params: Partial<MonthlyForecastQueryOptions>) =>
    HttpClient.get<MonthlyForecast[]>(
      ApiEndpoint.scm.getMonthlyForecast,
      params
    ),
  getMainStaticCard: (params: Partial<any>) =>
    HttpClient.get<MainStaticCard>(ApiEndpoint.scm.getMainStaticCard, params),
  getOtherStaticCard: (params: Partial<any>) =>
    HttpClient.get<OtherStaticCard>(ApiEndpoint.scm.getOtherStaticCard, params),
}
