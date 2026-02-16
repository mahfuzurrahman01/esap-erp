"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { permission } from "@/modules/crm/service/permission.service"
import {
  PermissionList,
  PermissionPaginator,
  PermissionQueryOptions,
} from "@/modules/crm/types/permission"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const PERMISSION_KEYS = createQueryKeys("permission")

export function usePermissionList(options?: Partial<PermissionQueryOptions>) {
  const queryKey = [PERMISSION_KEYS.all, options]

  return useQuery<PermissionPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return permission.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function usePermissionById(id: any) {
  return useQuery({
    queryKey: [PERMISSION_KEYS.detail(id)],
    queryFn: () => permission.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreatePermission() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => permission.create(data),
    onMutate: async (newPermission) => {
      await queryClient.cancelQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PERMISSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<PermissionPaginator>(queryKey)

      queryClient.setQueryData<PermissionPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newPermission],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newPermission, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-permission-created-successfully"))
      router.refresh()
    },
    onError: (err, newPermission, context) => {
      toast.error(t("form-failed-to-create-permission"))
      if (context?.previousCountries) {
        const queryKey = [
          PERMISSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePermission() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      permission.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: PERMISSION_KEYS.detail(id),
      })

      const queryKey = [
        PERMISSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<PermissionPaginator>(queryKey)
      const previousPermission = queryClient.getQueryData<PermissionList>(
        PERMISSION_KEYS.detail(id)
      )

      queryClient.setQueryData<PermissionPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(PERMISSION_KEYS.detail(id), data)

      return { previousCountries, previousPermission }
    },
    onSuccess: () => {
      toast.success(t("form-permission-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-permission"))
      if (context?.previousCountries) {
        const queryKey = [
          PERMISSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousPermission) {
        queryClient.setQueryData(
          PERMISSION_KEYS.detail(variables.id),
          context.previousPermission
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: PERMISSION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeletePermission() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => permission.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PERMISSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<PermissionPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<PermissionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-permission-deleted-successfully"))
    },

    onError: (err:any, variables, context) => {
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-failed-to-delete-permission"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          PERMISSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePermission() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => permission.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PERMISSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<PermissionPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<PermissionPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        }
      })

      return { previousItems }
    },

    onSuccess: (_, ids) => {
      const count = ids.length
      toast.success(
        count === 1
          ? t("form-successfully-deleted")
          : t("form-successfully-bulk-deleted", { count })
      )
    },

    onError: (err: any, variables, context) => {
      if (context?.previousItems) {
        const queryKey = [
          PERMISSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PERMISSION_KEYS.all],
        exact: false,
      })
    },
  })
}
