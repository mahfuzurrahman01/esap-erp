import {
  JournalEntryList,
  JournalEntryPaginator,
  JournalEntryQueryOptions,
  JournalEntryView,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const JournalEntryService = {
  all: (params: Partial<JournalEntryQueryOptions>) => {
    return HttpClient.get<JournalEntryPaginator>(
      ApiEndpoint.fms.journalEntry,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalEntryView>(
      ApiEndpoint.fms.journalEntryById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: JournalEntryList) =>
    HttpClient.post<JournalEntryList>(
      ApiEndpoint.fms.createJournalEntry,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: JournalEntryList) =>
    HttpClient.put<JournalEntryList>(
      ApiEndpoint.fms.updateJournalEntry,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalEntryList>(
      ApiEndpoint.fms.deleteJournalEntry(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalEntryList>(
      ApiEndpoint.fms.bulkDeleteJournalEntry,
      ids,
      EndpointType.FMS
    ),
}
