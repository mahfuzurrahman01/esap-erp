import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  TicketList,
  TicketPaginator,
  TicketQueryOptions,
} from "../types/ticket"

export const ticket = {
  all: (params: Partial<TicketQueryOptions>) =>
    httpClient.get<TicketPaginator>(ApiEndpoint.crm.tickets, params),
  get: (id: string) =>
    httpClient.get<TicketList>(`${ApiEndpoint.crm.tickets}/${id}`),
  create: (input: TicketList) =>
    httpClient.post<TicketList>(ApiEndpoint.crm.tickets, input, true),
  update: (id: string, input: TicketList) =>
    httpClient.put<TicketList>(`${ApiEndpoint.crm.tickets}/${id}`, input, true),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.tickets}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteTicket, ids)
  },
}
