"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { BillOfMaterialsVersionService } from "@/modules/scm/service/production-control/bill-of-materials/bill-of-materials-version.service"
import {
  BillOfMaterialsVersion,
  BillOfMaterialsVersionPaginator,
  BillOfMaterialsVersionQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-version-types"
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config"

const BILL_OF_MATERIALS_VERSION_KEYS = createQueryKeys(
  "bill-of-materials-version"
)

export function useBillOfMaterialsVersionList(
  options?: Partial<BillOfMaterialsVersionQueryOptions>
) {
  const queryKey = [BILL_OF_MATERIALS_VERSION_KEYS.all, options]

  return useQuery<BillOfMaterialsVersionPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return BillOfMaterialsVersionService.all(
        Object.assign({}, queryKey[1], pageParam)
      )
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useBillOfMaterialsVersionById(id: number) {
  return useQuery({
    queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.detail(id)],
    queryFn: () => BillOfMaterialsVersionService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  })
}

export function useCreateBillOfMaterialsVersion() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (
      data: BillOfMaterialsVersion
    ): Promise<BillOfMaterialsVersion> =>
      BillOfMaterialsVersionService.create(data),
    onMutate: async (newBillOfMaterialsVersion) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
      const queryKey = [
        BILL_OF_MATERIALS_VERSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousBillOfMaterialsVersions =
        queryClient.getQueryData<BillOfMaterialsVersionPaginator>(queryKey)
      queryClient.setQueryData<BillOfMaterialsVersionPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [newBillOfMaterialsVersion],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: [
              ...old.data,
              { ...newBillOfMaterialsVersion, id: Date.now() },
            ],
            count: old.count + 1,
          }
        }
      )
      return { previousBillOfMaterialsVersions }
    },
    onSuccess: () => {
      toast.success(t("form-created-successfully"))
      router.push(routes.scm.productionControl.billOfMaterials.billOfMaterials)
    },
    onError: (err: any, newBillOfMaterialsVersion, context) => {
      if (context?.previousBillOfMaterialsVersions) {
        const queryKey = [
          BILL_OF_MATERIALS_VERSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsVersions
        )
      }
      toast.error(t("form-creating-error"))
      // toast.error(err.response.data)
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateBillOfMaterialsVersion() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")
  const router = useRouter()
  return useMutation({
    mutationFn: ({ data }: { data: BillOfMaterialsVersion }) =>
      BillOfMaterialsVersionService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.detail(data.id!)],
      })
      const queryKey = [
        BILL_OF_MATERIALS_VERSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]
      const previousBillOfMaterialsVersions =
        queryClient.getQueryData<BillOfMaterialsVersionPaginator>(queryKey)
      const previousBillOfMaterialsVersion =
        queryClient.getQueryData<BillOfMaterialsVersion>(
          BILL_OF_MATERIALS_VERSION_KEYS.detail(data.id!)
        )
      queryClient.setQueryData<BillOfMaterialsVersionPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data],
              count: 1,
              pageIndex: DEFAULT_PAGE_INDEX,
              pageSize: DEFAULT_PAGE_SIZE,
            }
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === data.id ? { ...item, ...data } : item
            ),
          }
        }
      )
      queryClient.setQueryData(
        BILL_OF_MATERIALS_VERSION_KEYS.detail(data.id!),
        data
      )
      return { previousBillOfMaterialsVersions, previousBillOfMaterialsVersion }
    },
    onError: (err: any, variables, context) => {
      if (context?.previousBillOfMaterialsVersions) {
        const queryKey = [
          BILL_OF_MATERIALS_VERSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsVersions
        )
      }
      if (context?.previousBillOfMaterialsVersion) {
        queryClient.setQueryData(
          BILL_OF_MATERIALS_VERSION_KEYS.detail(variables.data.id!),
          context.previousBillOfMaterialsVersion
        )
      }
      toast.error(t("form-updating-error"))
      // toast.error(err.response.data)
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.detail(data.id!)],
        })
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: BILL_OF_MATERIALS_VERSION_KEYS.all,
      })
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.detail(data.id!)],
      })
      toast.success(t("form-updated-successfully"))
      router.push(routes.scm.productionControl.billOfMaterials.billOfMaterials)
    },
  })
}

export function useDeleteBillOfMaterialsVersion() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => BillOfMaterialsVersionService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_VERSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterialsVersions =
        queryClient.getQueryData<BillOfMaterialsVersionPaginator>(queryKey)

      // Optimistically remove the stock transfer from the list
      queryClient.setQueryData<BillOfMaterialsVersionPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          }
        }
      )

      return { previousBillOfMaterialsVersions }
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"))
    },

    onError: (err: any, variables, context) => {
      if (context?.previousBillOfMaterialsVersions) {
        const queryKey = [
          BILL_OF_MATERIALS_VERSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsVersions
        )
      }
      toast.error(t("form-error-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteBillOfMaterialsVersion() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      BillOfMaterialsVersionService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        BILL_OF_MATERIALS_VERSION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousBillOfMaterialsVersions =
        queryClient.getQueryData<BillOfMaterialsVersionPaginator>(queryKey)

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<BillOfMaterialsVersionPaginator>(
        queryKey,
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id!)),
            count: old.count - ids.length,
          }
        }
      )

      return { previousBillOfMaterialsVersions }
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
      if (context?.previousBillOfMaterialsVersions) {
        const queryKey = [
          BILL_OF_MATERIALS_VERSION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(
          queryKey,
          context.previousBillOfMaterialsVersions
        )
      }
      toast.error(t("form-error-bulk-delete"))
      // toast.error(err?.response?.data)
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [BILL_OF_MATERIALS_VERSION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBillOfMaterialsVersionOperations() {
  const queryClient = useQueryClient()

  const invalidateBillOfMaterialsVersionQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["bill-of-materials-version-list"],
    })
  }, [queryClient])

  return {
    invalidateBillOfMaterialsVersionQueries,
  }
}
