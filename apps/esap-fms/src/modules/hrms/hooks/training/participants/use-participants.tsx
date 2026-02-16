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
import { ParticipantService } from "@/server/service/hrms/training/participants.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Participant,
  ParticipantCreateInput,
  ParticipantDataResponse,
  ParticipantQueryOptions,
  ParticipantUpdateInput,
} from "@/types/hrms/training/participants-type"

const PARTICIPANT_KEYS = createQueryKeys(QUERY_KEYS.participantList)

export function useParticipantList(options?: Partial<ParticipantQueryOptions>) {
  const queryKey = [PARTICIPANT_KEYS.all, options]

  return useQuery<ParticipantDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ParticipantService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function useParticipantById(id: number) {
  return useQuery<Participant[]>({
    queryKey: [QUERY_KEYS.participant, id],
    queryFn: () => ParticipantService.get(id),
    enabled: !!id,
  })
}

export function useCreateParticipant() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ParticipantCreateInput): Promise<Participant> =>
      ParticipantService.create(data),
    onSuccess: (_, variables) => {
      toast.success(
        <Text as="b">{t("form-participants-created-successfully")}</Text>
      )
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.participant, variables.trainingProgramId],
      })
      router.push(routes.hr.participants)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useUpdateParticipant() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ParticipantUpdateInput) =>
      ParticipantService.update(data),
    onSuccess: (_, variables) => {
      toast.success(
        <Text as="b">{t("form-participant-updated-successfully")}</Text>
      )
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.participant, variables.id],
      })
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
  })
}

export function useUpdateParticipantAttendance() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: string
    }): Promise<Participant> => ParticipantService.updateAttendance(id, status),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-attendance-updated-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateParticipantFeedback() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number
      status: string
    }): Promise<Participant> => ParticipantService.updateFeedback(id, status),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-feedback-updated-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeleteParticipant() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => ParticipantService.delete(id),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-participant-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteParticipants() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => ParticipantService.bulkDelete(ids),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-selected-participants-deleted")}</Text>
      )
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PARTICIPANT_KEYS.all],
        exact: false,
      })
    },
  })
}
