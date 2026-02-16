import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  LeadsReportPaginator,
  LeadsReportQueryOptions,
} from "../types/leads-report"

export const LeadsReport = {
  all: (params: Partial<LeadsReportQueryOptions>) =>
    httpClient.get<LeadsReportPaginator>(ApiEndpoint.crm.leadsReport, params),
  allByStatus: (params: Partial<LeadsReportQueryOptions>) =>
    httpClient.get<LeadsReportPaginator>(ApiEndpoint.crm.leadsReportByStatus, params),
}
