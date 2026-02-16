import { PaginatedResponse } from "@/modules/scm/types/common.types"

import { HRMSFetchQueryOptions } from "../common.types"

export interface Folder {
  id?: number
  folderName: string
  description?: string | null
  permission: string | null
  createdDate?: string | null
  updatedDate?: string | null
}

export interface FileCreateInput {
  files: File[]
  folderId?: number
}

export interface UploadedFile {
  id: number
  uploadedFileName: string
  filePath: string
  folderId: number
  folder: Folder
  createdDate: string
}

export interface FolderCreateInput {
  folderName: string
  description?: string
  permission: string
  parentFolderId?: number | null
}

export interface FolderUpdateInput extends FolderCreateInput {
  id: number
}

export type folderQueryOptions = {
  search?: string
  pageIndex?: number
  pageSize?: number
  parentFolderId?: number | null
  enabled?: boolean
}

export type fileQueryOptions = HRMSFetchQueryOptions

export interface folderPaginatedResponse extends PaginatedResponse<Folder> {}
export interface filePaginatedResponse extends PaginatedResponse<File> {}
