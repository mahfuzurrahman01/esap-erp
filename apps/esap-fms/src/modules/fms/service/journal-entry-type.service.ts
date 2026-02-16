import {
  JournalEntryType,
  JournalEntryTypePaginator,
  JournalEntryTypeQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const journalEntryType = {
  all: (params: Partial<JournalEntryTypeQueryOptions>) => {
    return HttpClient.get<JournalEntryTypePaginator>(
      ApiEndpoint.fms.journalEntryType,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalEntryType>(
      ApiEndpoint.fms.journalEntryTypeById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: JournalEntryType) =>
    HttpClient.post<JournalEntryType>(
      ApiEndpoint.fms.createJournalEntryType,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: JournalEntryType) =>
    HttpClient.put<JournalEntryType>(
      ApiEndpoint.fms.updateJournalEntryType,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalEntryType>(
      ApiEndpoint.fms.deleteJournalEntryType(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalEntryType>(
      ApiEndpoint.fms.bulkJournalEntryType,
      ids,
      EndpointType.FMS
    ),
}
