import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { FileService } from "@/server/service/hrms/file-management/files/files.service"
import { FolderService } from "@/server/service/hrms/file-management/folders/folders.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Folder,
  UploadedFile,
  folderPaginatedResponse,
  folderQueryOptions,
} from "@/types/hrms/file-management/folders.types"

const FOLDER_KEYS = createQueryKeys(QUERY_KEYS.folderList)

export function useFolderList(options?: Partial<folderQueryOptions>) {
  return useQuery({
    queryKey: [QUERY_KEYS.folders, options],
    queryFn: () => FolderService.all(options || {}),
  })
}

export function useFolderById(id: number) {
  return useQuery<Folder>({
    queryKey: [QUERY_KEYS.folder, id],
    queryFn: () => FolderService.get(id),
    enabled: !!id,
  })
}

export function useCreateFolder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Folder): Promise<Folder> => FolderService.create(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-folder-created-successfully")}</Text>)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.folders],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useUpdateFolder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Folder) => FolderService.update(data),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-folder-updated-successfully")}</Text>)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.folders],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useDeleteFolder() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => FolderService.delete(id),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-folder-deleted-successfully")}</Text>)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.folders],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
  })
}

export function useBulkDeleteFolders() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => FolderService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [FOLDER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        FOLDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<folderPaginatedResponse>(queryKey)

      queryClient.setQueryData<folderPaginatedResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-folders-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          FOLDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FOLDER_KEYS.all],
        exact: false,
      })
    },
  })
}

/// =========== FILES ===========

export function useUploadFile() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (formData: FormData) => FileService.upload(formData),
    onSuccess: (_, variables) => {
      const folderId = variables.get("folderId")
      toast.success(<Text as="b">{t("form-file-uploaded-successfully")}</Text>)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.file, Number(folderId)],
      })
    },
    onError: (err: Error) => {
      console.error("Upload error:", err)
      toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
    },
  })
}

export function useDeleteFile() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => FileService.delete(id),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-file-deleted-successfully")}</Text>)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.files],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
  })
}

export function useFilesByFolderId(folderId: number) {
  return useQuery<UploadedFile[]>({
    queryKey: [QUERY_KEYS.file, folderId],
    queryFn: () => FileService.get(folderId),
    enabled: !!folderId,
  })
}

export function useBulkDeleteFiles() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => FileService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-files-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.file],
        exact: false,
      })
    },
  })
}
