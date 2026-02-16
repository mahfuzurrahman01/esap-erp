import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  CustomerGrowthReportPaginator,
  CustomerGrowthReportQueryOptions,
} from "../types/customer-growth-report"

export const customerGrowthReport = {
  all: (params: Partial<CustomerGrowthReportQueryOptions>) =>
    httpClient.get<CustomerGrowthReportPaginator>(
      ApiEndpoint.crm.customerGrowthReport,
      params
    ),
}
