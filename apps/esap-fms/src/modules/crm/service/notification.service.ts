import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  NotificationList,
  NotificationPaginator,
  NotificationQueryOptions,
} from "../types/notification"

export const notification = {
  all: (params: Partial<NotificationQueryOptions>) =>
    httpClient.get<NotificationPaginator>(ApiEndpoint.crm.notification, params),
  get: (id: string) =>
    httpClient.get<NotificationList>(`${ApiEndpoint.crm.notification}/${id}`),
  create: (input: NotificationList) =>
    httpClient.post<NotificationList>(ApiEndpoint.crm.notification, input),
  update: (id: string, input: NotificationList) =>
    httpClient.patch<NotificationList>(
      `${ApiEndpoint.crm.notification}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.notification}/${id}`),
}
