import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  MonthlyLeadsReportPaginator,
  MonthlyLeadsReportQueryOptions,
} from "../types/monthly-leads-report"

export const monthlyLeadsReport = {
  all: (params: Partial<MonthlyLeadsReportQueryOptions>) =>
    httpClient.get<MonthlyLeadsReportPaginator>(
      ApiEndpoint.crm.monthlyLeadsReport,
      params
    ),
}
