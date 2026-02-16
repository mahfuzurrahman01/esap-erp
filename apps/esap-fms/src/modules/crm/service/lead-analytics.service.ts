import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"

export const todayLeadAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.todayLeadAnalytics,
      params
    ),
}

export const weeklyleads = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.weeklyleads,
      params
    ),
}

export const topLeadSource = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.topLeadSource,
      params
    ),
}

export const monthlyLeadAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.monthlyLeadAnalytics,
      params
    ),
}

export const industryLeadAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.industryLeadAnalytics,
      params
    ),
}