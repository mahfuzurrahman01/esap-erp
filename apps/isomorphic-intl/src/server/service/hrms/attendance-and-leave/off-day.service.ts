import { ApiEndpoint } from "@/server/client"
import {
  OffDay,
  OffDaysDataResponse,
} from "@/types/hrms/attendance-and-leave/off-day.types"
import HttpClient from "@/utils/axios"
import { OffDayFormInput } from "@/validators/hrms/off-day.schema"

export const OffDayService = {
  all: (params: any) => {
    return HttpClient.get<OffDaysDataResponse>(
      ApiEndpoint.hr.fetchAllOffDays,
      params
    )
  },
  create: (input: OffDayFormInput) =>
    HttpClient.post<OffDay>(ApiEndpoint.hr.createOffDay, input),
  update: (input: OffDay) =>
    HttpClient.put<OffDay>(`${ApiEndpoint.hr.updateOffDay}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteOffDay(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.post(`${ApiEndpoint.hr.deleteOffDays}`, { ids }),
}
