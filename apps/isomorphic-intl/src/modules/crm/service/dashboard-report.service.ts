import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"

export const dashboardSummary = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.dashboardSummary,
      params
    ),
}
