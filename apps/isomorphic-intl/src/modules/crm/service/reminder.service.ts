import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  ReminderList,
  ReminderPaginator,
  ReminderQueryOptions,
} from "../types/reminder"

export const reminder = {
  all: (params: Partial<ReminderQueryOptions>) =>
    httpClient.get<ReminderPaginator>(ApiEndpoint.crm.reminders, params),
  get: (id: string) =>
    httpClient.get<ReminderList>(`${ApiEndpoint.crm.reminders}/${id}`),
  create: (input: ReminderList) =>
    httpClient.post<ReminderList>(ApiEndpoint.crm.reminders, input),
  update: (id: string, input: ReminderList) =>
    httpClient.patch<ReminderList>(`${ApiEndpoint.crm.reminders}/${id}`, input),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.reminders}/${id}`),
}
