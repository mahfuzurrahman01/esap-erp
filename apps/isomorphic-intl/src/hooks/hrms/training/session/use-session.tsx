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

import { routes } from "@/config/routes"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { TrainingSessionService } from "@/server/service/hrms/training/training-session.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  TrainingSession,
  TrainingSessionDataResponse,
  TrainingSessionQueryOptions,
} from "@/types/hrms/training/training-session-type"

const SESSION_KEYS = createQueryKeys(QUERY_KEYS.sessionList)

export function useSessionList(options?: Partial<TrainingSessionQueryOptions>) {
  const queryKey = [SESSION_KEYS.all, options]

  return useQuery<TrainingSessionDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return TrainingSessionService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
  })
}

export function useSessionById(id: number) {
  return useQuery<TrainingSession>({
    queryKey: [QUERY_KEYS.session, id],
    queryFn: () => TrainingSessionService.get(id),
    enabled: !!id,
  })
}

export function useCreateSession() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingSession): Promise<TrainingSession> =>
      TrainingSessionService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-session-created-successfully")}</Text>
      )
      router.push(routes.hr.trainingSession)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateSession() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: TrainingSession) => TrainingSessionService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-session-updated-successfully")}</Text>
      )
      router.push(routes.hr.trainingSession)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteSession() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => TrainingSessionService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-session-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteSessions() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => TrainingSessionService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(<Text as="b">{t("form-selected-sessions-deleted")}</Text>)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SESSION_KEYS.all],
        exact: false,
      })
    },
  })
}
