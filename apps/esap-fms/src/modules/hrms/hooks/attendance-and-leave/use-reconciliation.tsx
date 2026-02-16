import { useParams, useRouter } from "next/navigation"

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
import { ReconciliationService } from "@/server/service/hrms/attendance-and-leave/reconciliation.service"
import { QUERY_KEYS } from "@/server/service/hrms/hrms-query-keys.constants"
import { createQueryKeys } from "@/server/service/query-config"
import {
  ApprovalDataResponse,
  ApprovalFormInput,
  ReconciliationDataResponse,
  ReconciliationQueryOptions,
  ReconciliationRequest,
} from "@/types/hrms/attendance-and-leave/reconciliation.types"

// Fetch Reconciliation list with pagination
const RECONCILIATION_KEYS = createQueryKeys(QUERY_KEYS.reconciliationList)

export function useReconciliationList(
  options?: Partial<ReconciliationQueryOptions>
) {
  const queryKey = [RECONCILIATION_KEYS.all, options]

  return useQuery<ReconciliationDataResponse, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ReconciliationService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Fetch single Reconciliation by ID
export function useReconciliationById(id: number) {
  return useQuery<ReconciliationRequest, AxiosError>({
    queryKey: [QUERY_KEYS.reconciliation, id],
    queryFn: () => ReconciliationService.get(id),
    enabled: !!id,
  })
}

// Create new Reconciliation
export function useCreateReconciliation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")
  const params = useParams()
  const employeeId = params.employeeId
  return useMutation({
    mutationFn: (data: ReconciliationRequest): Promise<ReconciliationRequest> =>
      ReconciliationService.create(data),
    onMutate: async (newAttendance) => {
      await queryClient.cancelQueries({
        queryKey: [RECONCILIATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        RECONCILIATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs =
        queryClient.getQueryData<ReconciliationDataResponse>(queryKey)

      queryClient.setQueryData<ReconciliationDataResponse>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAttendance],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAttendance, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCOAs }
    },
    onSuccess: async () => {
      toast.success(<Text as="b">{t("form-reconciliation-created")}</Text>)
      router.push(`${routes.hr.reconciliationRequests}`)
    },
    onError: (err, newAttendance, context) => {
      if (context?.previousCOAs) {
        const queryKey = [
          RECONCILIATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [RECONCILIATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useReconciliationApproval() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: ApprovalFormInput): Promise<ApprovalFormInput> =>
      ReconciliationService.update(data),
    onMutate: async (newAttendance) => {
      // Cancel all related queries
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: [RECONCILIATION_KEYS.all],
        }),
        queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.attendanceList],
        }),
        queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.attendance],
        }),
      ])

      const queryKey = [
        RECONCILIATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCOAs =
        queryClient.getQueryData<ApprovalDataResponse>(queryKey)

      return { previousCOAs }
    },
    onSuccess: async (data) => {
      // Invalidate all related queries
      await Promise.all([
        // Invalidate reconciliation list
        queryClient.invalidateQueries({
          queryKey: [RECONCILIATION_KEYS.all],
        }),
        // Invalidate attendance list
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.attendanceList],
        }),
        // Invalidate specific employee attendance if available
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.attendance],
        }),
      ])

      // Force refetch attendance list
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.attendanceList],
      })

      // Trigger the custom event for attendance table update
      window.dispatchEvent(new Event("reconciliation-approved"))

      toast.success(<Text as="b">{t("form-reconciliation-updated")}</Text>)
      router.push(`${routes.hr.reconciliationRequests}`)
    },
    onError: (err, newAttendance, context) => {
      if (context?.previousCOAs) {
        const queryKey = [
          RECONCILIATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCOAs)
      }
    },
  })
}

// // Update existing Reconciliation
// export function useUpdateReconciliation() {
//   const queryClient = useQueryClient()

//   return useMutation<ReconciliationRequest, AxiosError, ReconciliationPutData>({
//     mutationFn: (data) => ReconciliationService.update(data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.reconciliationList],
//       })
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.reconciliation, data.id],
//       })
//     },
//   })
// }

// Delete Reconciliation
export function useDeleteReconciliation() {
  const queryClient = useQueryClient()
  return useMutation<void, AxiosError, number>({
    mutationFn: async (id) => {
      await ReconciliationService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.reconciliationList],
      })
    },
  })
}

// Advanced feature: Bulk operations
export function useBulkDeleteReconciliation() {
  const queryClient = useQueryClient()
  const bulkDelete = useMutation<void, AxiosError, number[]>({
    mutationFn: async (ids) => {
      await ReconciliationService.bulkDelete(ids)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.reconciliationList],
      })
    },
  })

  return { bulkDelete }
}
