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
import { role } from "@/modules/crm/service/role.service"
import {
  RoleList,
  RolePaginator,
  RoleQueryOptions,
} from "@/modules/crm/types/role"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

export const ROLE_KEYS = createQueryKeys("role")

export function useRoleList(options?: Partial<RoleQueryOptions>) {
  const queryKey = [ROLE_KEYS.all, options]

  return useQuery<RolePaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return role.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useRoleById(id: any) {
  return useQuery({
    queryKey: [ROLE_KEYS.detail(id)],
    queryFn: () => role.get(id),
    enabled: !!id,
    throwOnError: false,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateRole() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => role.create(data),
    onMutate: async (newrole) => {
      await queryClient.cancelQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ROLE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<RolePaginator>(queryKey)

      queryClient.setQueryData<RolePaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newrole],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newrole, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      toast.success(t("form-role-created-successfully"))
      router.refresh()
    },
    onError: (err, newrole, context) => {
      toast.error(t("form-failed-to-create-role"))
      if (context?.previousCountries) {
        const queryKey = [
          ROLE_KEYS.all,
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
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateRole() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) => role.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: ROLE_KEYS.detail(id),
      })

      const queryKey = [
        ROLE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<RolePaginator>(queryKey)
      const previousrole = queryClient.getQueryData<RoleList>(
        ROLE_KEYS.detail(id)
      )

      queryClient.setQueryData<RolePaginator>(queryKey, (old: any) => {
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

      queryClient.setQueryData(ROLE_KEYS.detail(id), data)

      return { previousCountries, previousrole }
    },
    onSuccess: () => {
      toast.success(t("form-role-updated-successfully"))
      router.refresh()
    },
    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-update-role"))
      if (context?.previousCountries) {
        const queryKey = [
          ROLE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousrole) {
        queryClient.setQueryData(
          ROLE_KEYS.detail(variables.id),
          context.previousrole
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ROLE_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteRole() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: any) => role.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ROLE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<RolePaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<RolePaginator>(queryKey, (old) => {
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
      toast.success(t("form-role-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-role"))
      if (context?.previousCountries) {
        const queryKey = [
          ROLE_KEYS.all,
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
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })
    },
  })
}


export function useBulkDeleteRole() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => role.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ROLE_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<RolePaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<RolePaginator>(queryKey, (old) => {
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
          ROLE_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousItems)
      }
      if(err.response.data.details){
        toast.error(err.response.data.details)
      }else{
        toast.error(t("form-error-bulk-delete"))
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [ROLE_KEYS.all],
        exact: false,
      })
    },
  })
}