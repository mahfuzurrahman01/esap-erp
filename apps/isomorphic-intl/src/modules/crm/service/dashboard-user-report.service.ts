import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"

export const dashboardUserReport = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.dashboardTopUsersReport,
      params
    ),
}

export const analyticLeadSummary = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.analyticLeadSummary,
      params
    ),
}

export const salesRevenueOverview = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.salesRevenueOverview,
      params
    ),
}

export const dealPipelineSummary = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.dealPipelineSummary,
      params
    ),
}

export const customerSummary = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.customerSummary,
      params
    ),
}

export const leadTargetOverview = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.leadTargetOverview,
      params
    ),
}

export const revenueTargetOverview = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.revenueTargetOverview,
      params
    ),
}

export const threeMonthsLead = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.threeMonthsLead,
      params
    ),
}

export const leadSourceOverview = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.leadSourceOverview,
      params
    ),
}

export const profileSaleOverview = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.profileSaleOverview,
      params
    ),
}
