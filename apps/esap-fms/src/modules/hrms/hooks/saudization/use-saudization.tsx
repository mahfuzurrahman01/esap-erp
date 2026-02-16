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
import { SaudizationService } from "@/server/service/hrms/saudization/saudization.service"
import { createQueryKeys } from "@/server/service/query-config"
import {
  Saudization,
  SaudizationConfiguration,
  SaudizationQueryOptions,
} from "@/types/hrms/saudization/saudization-type"

const SAUDIZATION_KEYS = createQueryKeys(QUERY_KEYS.saudizationList)

export function useSaudization(options?: Partial<SaudizationQueryOptions>) {
  const queryKey = [SAUDIZATION_KEYS.all, options]

  return useQuery<Saudization, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return SaudizationService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSendSaudizationEmail() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: SaudizationConfiguration
    ): Promise<SaudizationConfiguration> => SaudizationService.create(data),
    onMutate: async (newEmployee) => {
      await queryClient.cancelQueries({
        queryKey: [SAUDIZATION_KEYS.all],
        exact: false,
      })
      const queryKey = [
        SAUDIZATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
    },
    onSuccess: async (response) => {
      toast.success(<Text as="b">{t("form-email-sent-successfully")}</Text>)
      router.push(routes.hr.saudizationSettings)
    },
    onError: (err: AxiosError) => {
      if (err) {
        toast.error(<Text as="b">{t(`${err.response?.data}`)}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [SAUDIZATION_KEYS.all],
        exact: false,
      })
    },
  })
}
