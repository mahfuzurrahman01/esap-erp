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
import { PayslipService } from "@/server/service/hrms/payroll/payslip.service"
import { createQueryKeys } from "@/server/service/query-config"
import { payslipPaginatedResponse } from "@/types/hrms/payroll/payslip.types"
import { Payslip } from "@/types/hrms/payroll/payslip.types"
import { payslipQueryOptions } from "@/types/hrms/payroll/payslip.types"

export const PAYSLIP_KEYS = createQueryKeys(QUERY_KEYS.payslipList)

export function usePayslipList(options?: Partial<payslipQueryOptions>) {
  const queryKey = [PAYSLIP_KEYS.all, options]

  return useQuery<payslipPaginatedResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PayslipService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
  })
}

export function usePayslipById(id: number) {
  return useQuery<Payslip>({
    queryKey: [QUERY_KEYS.payslip, id],
    queryFn: () => PayslipService.get(id),
    enabled: !!id,
  })
}

export function useCreatePayslip() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Payslip): Promise<Payslip> =>
      PayslipService.create(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payslip-created-successfully")}</Text>
      )
      router.push(routes.hr.payslip)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePayslip() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: Payslip) => PayslipService.update(data),
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payslip-updated-successfully")}</Text>
      )
      router.push(routes.hr.payslip)
    },
    onError: (err: AxiosError) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-something-went-wrong")}</Text>)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useDeletePayslip() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => PayslipService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYSLIP_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<payslipPaginatedResponse>(queryKey)

      queryClient.setQueryData<payslipPaginatedResponse>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-payslip-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          PAYSLIP_KEYS.all,
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
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeletePayslips() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => PayslipService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })

      const queryKey = [
        PAYSLIP_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousData =
        queryClient.getQueryData<payslipPaginatedResponse>(queryKey)

      queryClient.setQueryData<payslipPaginatedResponse>(queryKey, (old) => {
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
        <Text as="b">{t("form-selected-payslips-deleted-successfully")}</Text>
      )
    },
    onError: (err: AxiosError, variables, context) => {
      if (err?.response?.data) {
        toast.error(<Text as="b">{t("form-can-not-delete")}</Text>)
      }
      if (context?.previousData) {
        const queryKey = [
          PAYSLIP_KEYS.all,
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
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdatePayslipStatus() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: { serialNumber: string; status: string }) =>
      PayslipService.updatePayslipStatus(data),
    onSuccess: () => {},
    onError: (err: AxiosError) => {},
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYSLIP_KEYS.all],
        exact: false,
      })
    },
  })
}
