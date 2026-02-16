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
import { setting } from "@/modules/crm/service/setting.service"
import {
  SettingList,
  SettingPaginator,
  SettingQueryOptions,
} from "@/modules/crm/types/setting"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const SETTING_KEYS = createQueryKeys("Setting")

export function useSettingList(options?: Partial<SettingQueryOptions>) {
  const queryKey = [SETTING_KEYS.all, options]

  return useQuery<SettingPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return setting.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useSettingById(id: any) {
  return useQuery({
    queryKey: [SETTING_KEYS.detail(id)],
    queryFn: () => setting.get(id),
    enabled: !!id,
    throwOnError: false,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateSetting() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => setting.create(data),
    onMutate: async (newSetting) => {
      await queryClient.cancelQueries({
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SETTING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SettingPaginator>(queryKey)

      queryClient.setQueryData<SettingPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newSetting],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newSetting, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-Setting-created-successfully"))
      router.refresh()
    },
    onError: (err, newSetting, context) => {
      toast.error(t("form-failed-to-create-Setting"))
      if (context?.previousCountries) {
        const queryKey = [
          SETTING_KEYS.all,
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
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSetting() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      setting.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: SETTING_KEYS.detail(id),
      })

      const queryKey = [
        SETTING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<SettingPaginator>(queryKey)
      const previousSetting = queryClient.getQueryData<SettingList>(
        SETTING_KEYS.detail(id)
      )

      queryClient.setQueryData<SettingPaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(SETTING_KEYS.detail(id), data)

      return { previousCountries, previousSetting }
    },
    onSuccess: () => {
      toast.success(t("form-setting-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-Setting"))
      if (context?.previousCountries) {
        const queryKey = [
          SETTING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousSetting) {
        queryClient.setQueryData(
          SETTING_KEYS.detail(variables.id),
          context.previousSetting
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: SETTING_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteSetting() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => setting.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })

      const queryKey = [
        SETTING_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<SettingPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<SettingPaginator>(queryKey, (old) => {
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
      toast.success(t("form-Setting-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      if (context?.previousCountries) {
        const queryKey = [
          SETTING_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      toast.error(t("form-failed-to-delete-Setting"))
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [SETTING_KEYS.all],
        exact: false,
      })
    },
  })
}
