import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  DashboardReportPaginator,
  DashboardReportQueryOptions,
} from "../types/dashboard-report"

export const monthlyRevenueAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.monthlyRevenueAnalytics,
      params
    ),
}

export const dealsAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.dealsAnalytics,
      params
    ),
}

export const lostRevenueAnalytics = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.lostRevenueAnalytics,
      params
    ),
}

export const revenueByUser = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.revenueByUser,
      params
    ),
}

export const dealByStage = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.dealByStage,
      params
    ),
}

export const amountByUser = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.amountByUser,
      params
    ),
}

export const amountBySource = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.amountBySource,
      params
    ),
}

export const amountByStage = {
  all: (params: Partial<DashboardReportQueryOptions>) =>
    httpClient.get<DashboardReportPaginator>(
      ApiEndpoint.crm.amountByStage,
      params
    ),
}