import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  TicketsReportPaginator,
  TicketsReportQueryOptions,
} from "../types/tickets-report"

export const ticketsReport = {
  all: (params: Partial<TicketsReportQueryOptions>) =>
    httpClient.get<TicketsReportPaginator>(
      ApiEndpoint.crm.ticketsReport,
      params
    ),
}
