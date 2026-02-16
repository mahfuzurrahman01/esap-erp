import { ApiEndpoint } from "@/server/client"
import {
  Folder,
  folderPaginatedResponse,
  folderQueryOptions,
} from "@/types/hrms/file-management/folders.types"
import HttpClient from "@/utils/axios"

export const FolderService = {
  all: (params: Partial<folderQueryOptions>) => {
    return HttpClient.get<folderPaginatedResponse>(
      ApiEndpoint.hr.fetchAllFolders,
      params
    )
  },

  get: (id: number) => {
    return HttpClient.get<Folder>(ApiEndpoint.hr.fetchFolderById(id))
  },

  create: (input: Folder) =>
    HttpClient.post<Folder>(ApiEndpoint.hr.createFolder, input),

  update: (input: Folder) =>
    HttpClient.put<Folder>(`${ApiEndpoint.hr.updateFolder}`, input),

  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteFolder(id)}`),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteFolders}`, ids),
}
