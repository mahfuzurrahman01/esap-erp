import { ApiEndpoint } from "@/server/client"
import {
  WorkingSchedule,
  WorkingScheduleDataResponse,
  WorkingScheduleQueryOptions,
} from "@/types/hrms/employee/working-schedule.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const WorkingScheduleService = {
  all: (params: Partial<WorkingScheduleQueryOptions>) => {
    return HttpClient.get<WorkingScheduleDataResponse>(
      ApiEndpoint.hr.fetchAllWorkingSchedules,
      params,
      ApiBase.HRMS
    )
  },
  get: (id: number) =>
    HttpClient.get<WorkingSchedule>(
      `${ApiEndpoint.hr.fetchWorkingScheduleById(id)}`, false, ApiBase.HRMS
    ),
  create: (input: WorkingSchedule) =>
    HttpClient.post<WorkingSchedule>(
      ApiEndpoint.hr.createWorkingSchedule,
      input, false, ApiBase.HRMS
    ),
  update: (input: WorkingSchedule) =>
    HttpClient.put<WorkingSchedule>(
      `${ApiEndpoint.hr.updateWorkingSchedule}`,
      input, false, ApiBase.HRMS
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteWorkingSchedule(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteWorkingSchedules}`, ids, ApiBase.HRMS),
}
