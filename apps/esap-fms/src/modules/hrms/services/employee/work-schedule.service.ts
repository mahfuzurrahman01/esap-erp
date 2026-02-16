import { ApiEndpoint } from "@/server/client"
import {
  WorkingSchedule,
  WorkingScheduleDataResponse,
  WorkingScheduleQueryOptions,
} from "@/types/hrms/employee/working-schedule.types"
import HttpClient from "@/utils/axios"

export const WorkingScheduleService = {
  all: (params: Partial<WorkingScheduleQueryOptions>) => {
    return HttpClient.get<WorkingScheduleDataResponse>(
      ApiEndpoint.hr.fetchAllWorkingSchedules,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<WorkingSchedule>(
      `${ApiEndpoint.hr.fetchWorkingScheduleById(id)}`
    ),
  create: (input: WorkingSchedule) =>
    HttpClient.post<WorkingSchedule>(
      ApiEndpoint.hr.createWorkingSchedule,
      input
    ),
  update: (input: WorkingSchedule) =>
    HttpClient.put<WorkingSchedule>(
      `${ApiEndpoint.hr.updateWorkingSchedule}`,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteWorkingSchedule(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteWorkingSchedules}`, ids),
}
