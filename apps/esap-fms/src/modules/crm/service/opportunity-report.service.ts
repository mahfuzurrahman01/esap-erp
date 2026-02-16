import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  OpportunityReportPaginator,
  OpportunityReportQueryOptions,
} from "../types/opportunity-report"

export const opportunityReport = {
  all: (params: Partial<OpportunityReportQueryOptions>) =>
    httpClient.get<OpportunityReportPaginator>(ApiEndpoint.crm.opportunityReport, params)
}
