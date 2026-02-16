import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  CampaignReportPaginator,
  CampaignReportQueryOptions,
} from "../types/campaign-report"

export const campaignsReport = {
  all: (params: Partial<CampaignReportQueryOptions>) =>
    httpClient.get<CampaignReportPaginator>(
      ApiEndpoint.crm.campaignsReport,
      params
    ),
}
