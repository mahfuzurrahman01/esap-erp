import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  MessageList,
  MessagePaginator,
  MessageQueryOptions,
} from "../types/message"

export const message = {
  all: (params: Partial<MessageQueryOptions>) =>
    httpClient.get<MessagePaginator>(ApiEndpoint.crm.message, params),
  detail: (params: Partial<MessageQueryOptions>) =>
    httpClient.get<MessagePaginator>(ApiEndpoint.crm.messageDetail, params),
  get: (id: string) =>
    httpClient.get<MessageList>(`${ApiEndpoint.crm.message}/${id}`),
  create: (input: MessageList) =>
    httpClient.post<MessageList>(ApiEndpoint.crm.message, input, true),
  createDetails: (input: MessageList) =>
    httpClient.post<MessageList>(ApiEndpoint.crm.messageDetails, input, true),
  update: (id: string, input: MessageList) =>
    httpClient.put<MessageList>(
      `${ApiEndpoint.crm.message}/${id}`,
      input,
      true
    ),
  updateBlock: (id: string, input: MessageList) =>
    httpClient.patch<MessageList>(
      `${ApiEndpoint.crm.messageBlock}/${id}`,
      input
    ),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.message}/${id}`),
}
