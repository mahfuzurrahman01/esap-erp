import { ApiEndpoint } from "@/server/client"
import {
  FileCreateInput,
  UploadedFile,
  filePaginatedResponse,
  fileQueryOptions,
} from "@/types/hrms/file-management/folders.types"
import HttpClient from "@/utils/axios"

export const FileService = {
  all: (params: Partial<fileQueryOptions>) => {
    return HttpClient.get<filePaginatedResponse>(
      ApiEndpoint.hr.fetchAllFiles,
      params
    )
  },

  get: (id: number) =>
    HttpClient.get<UploadedFile[]>(`${ApiEndpoint.hr.fetchFileById(id)}`),

  delete: (id: number) => HttpClient.delete(ApiEndpoint.hr.deleteFile(id)),

  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteFiles}`, ids),

  upload: async (formData: FormData) => {
    const response = await fetch(
      "https://esapdev.site:7000/hrms/uploadedfile/add-uploaded-file",
      {
        method: "POST",
        body: formData,
      }
    )
    if (!response.ok) {
      throw new Error("Upload failed")
    }
    return response.json()
  },
  // upload: (formData: FormData) =>
  //   HttpClient.post<File>(ApiEndpoint.hr.createFile, formData, true),
}
