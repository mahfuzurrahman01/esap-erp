import { ApiEndpoint } from "@/server/client"
import {
  DepartmentStats,
  DepartmentStatsDataResponse,
  DepartmentStatsQueryOptions,
} from "@/types/hrms/dashboard-report/employee-statistics.type"
import HttpClient from "@/utils/axios"

export const DepartmentStatisticsService = {
  all: (params: Partial<DepartmentStatsQueryOptions>) => {
    return HttpClient.get<DepartmentStats[]>(
      ApiEndpoint.hr.fetchDepartmentStatistics,
      params
    )
  },
}
