import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  ContactList,
  ContactPaginator,
  ContactQueryOptions,
} from "../types/contact"

export const contact = {
  all: (params: Partial<ContactQueryOptions>) =>
    httpClient.get<ContactPaginator>(ApiEndpoint.crm.contacts, params),
  get: (id: string) =>
    httpClient.get<ContactList>(`${ApiEndpoint.crm.contacts}/${id}`),
  create: (input: ContactList) =>
    httpClient.post<ContactList>(ApiEndpoint.crm.contacts, input, true),
  update: (id: string, input: ContactList) =>
    httpClient.put<ContactList>(
      `${ApiEndpoint.crm.contacts}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.contacts}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteContact, ids)
  },
}
