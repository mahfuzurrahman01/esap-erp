import {
  SalesReportPaginator,
  SalesReportQueryOptions,
} from "@/modules/crm/types/sales-report"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const salesReport = {
  all: (params: Partial<SalesReportQueryOptions>) =>
    httpClient.get<SalesReportPaginator>(ApiEndpoint.crm.salesReport, params),
}
