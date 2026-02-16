import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { ApplicationService } from "@/server/service/hrms/recruitment/application-service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Application,
  ApplicationCreateInput,
  ApplicationDataResponse,
  ApplicationQueryOptions,
} from "@/types/hrms/recruitment/applications-type"

const APPLICATION_KEYS = createQueryKeys(QUERY_KEYS.applicationList)

export function useApplicationList(options?: Partial<ApplicationQueryOptions>) {
  const queryKey = [APPLICATION_KEYS.all, options]

  return useQuery<ApplicationDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ApplicationService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useApplicationById(id: number) {
  return useQuery<Application>({
    queryKey: [QUERY_KEYS.application, id],
    queryFn: () => ApplicationService.get(id),
    enabled: !!id,
  })
}

export function useCreateApplication() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ApplicationCreateInput): Promise<Application> =>
      ApplicationService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-application-submitted-successfully")}</Text>
      )
      router.push(routes.hr.applications)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-application-submit-failed")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: Application["status"]
    }) => ApplicationService.updateStatus(id, status),
    onSuccess: (data) => {
      toast.success(<Text as="b">{t("form-application-status-updated")}</Text>)
      return data
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-status-update-failed")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteApplication() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ApplicationService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        APPLICATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousApplications =
        queryClient.getQueryData<ApplicationDataResponse>(queryKey)

      queryClient.setQueryData<ApplicationDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousApplications }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-application-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousApplications) {
        const queryKey = [
          APPLICATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousApplications)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteApplications() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => ApplicationService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        APPLICATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousApplications =
        queryClient.getQueryData<ApplicationDataResponse>(queryKey)

      queryClient.setQueryData<ApplicationDataResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id ?? 0)),
          count: old.count - ids.length,
        }
      })

      return { previousApplications }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-applications-deleted")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousApplications) {
        const queryKey = [
          APPLICATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousApplications)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [APPLICATION_KEYS.all],
        exact: false,
      })
    },
  })
}
