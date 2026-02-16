import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { DepartmentStatisticsService } from "@/server/service/hrms/dashboard-report/department-statistics"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  DepartmentStats,
  DepartmentStatsQueryOptions,
} from "@/types/hrms/dashboard-report/employee-statistics.type"

// Create query keys for dashboard report
const DASHBOARD_REPORT_KEYS = createQueryKeys(QUERY_KEYS.dashboardReport)

// Fetch department statistics

export function useDepartmentStatistics(
  options?: Partial<DepartmentStatsQueryOptions>
) {
  const queryKey = [DASHBOARD_REPORT_KEYS.all, options]

  return useQuery<DepartmentStats[], Error>({
    queryKey,
    queryFn: () => DepartmentStatisticsService.all(options || {}),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
