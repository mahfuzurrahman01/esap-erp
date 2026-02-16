import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  MeetingList,
  MeetingPaginator,
  MeetingQueryOptions,
} from "../types/meeting"

export const meeting = {
  all: (params: Partial<MeetingQueryOptions>) =>
    httpClient.get<MeetingPaginator>(ApiEndpoint.crm.meetings, params),
  get: (id: string) =>
    httpClient.get<MeetingList>(`${ApiEndpoint.crm.meetings}/${id}`),
  create: (input: MeetingList) =>
    httpClient.post<MeetingList>(ApiEndpoint.crm.meetings, input, true),
  update: (id: string, input: MeetingList) =>
    httpClient.put<MeetingList>(
      `${ApiEndpoint.crm.meetings}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.meetings}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteMeeting, ids)
  },
}
