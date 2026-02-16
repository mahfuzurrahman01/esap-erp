"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { routes } from "@/config/routes"
import { createQueryKeys } from "@/server/service/query-config"

import { AssetLocationService } from "../service/asset-location.service"
import {
  AssetLocationList,
  AssetLocationPaginator,
  AssetLocationQueryOptions,
} from "../types"

const ASSET_LOCATION_KEYS = createQueryKeys("asset-location")

export function useAssetLocationList(
  options?: Partial<AssetLocationQueryOptions>
) {
  const queryKey = [ASSET_LOCATION_KEYS.all, options]

  return useQuery<AssetLocationPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return AssetLocationService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useAssetLocationById(id: number) {
  return useQuery<AssetLocationList, Error>({
    queryKey: ASSET_LOCATION_KEYS.detail(id),
    queryFn: () => AssetLocationService.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreateAssetLocation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetLocationList): Promise<AssetLocationList> =>
      AssetLocationService.create(data),
    onMutate: async (newAssetLocation) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_LOCATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetLocations =
        queryClient.getQueryData<AssetLocationPaginator>(queryKey)

      queryClient.setQueryData<AssetLocationPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newAssetLocation],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newAssetLocation, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousAssetLocations }
    },
    onSuccess: async (response) => {
      const newAssetLocationId = response.id
      queryClient.setQueryData(
        ASSET_LOCATION_KEYS.detail(newAssetLocationId!),
        response
      )
      toast.success(
        <Text as="b">{t("form-asset-location-successfully-created")}</Text>
      )
    },
    onError: (err, newAssetLocation, context) => {
      toast.error(
        <Text as="b">{t("form-asset-location-failed-to-create")}</Text>
      )
      if (context?.previousAssetLocations) {
        const queryKey = [
          ASSET_LOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetLocations)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateAssetLocation() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: AssetLocationList) =>
      AssetLocationService.update(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })

      // Only cancel queries if id exists
      if (data.id) {
        await queryClient.cancelQueries({
          queryKey: ASSET_LOCATION_KEYS.detail(data.id),
        })
      }

      const queryKey = [
        ASSET_LOCATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetLocations =
        queryClient.getQueryData<AssetLocationPaginator>(queryKey)

      // Only get previous country data if id exists
      const previousAssetLocation = data.id
        ? queryClient.getQueryData<AssetLocationList>(
          ASSET_LOCATION_KEYS.detail(data.id)
        )
        : undefined

      queryClient.setQueryData<AssetLocationPaginator>(queryKey, (old) => {
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
      })

      // Only set query data if id exists
      if (data.id) {
        queryClient.setQueryData(
          ASSET_LOCATION_KEYS.detail(data.id),
          data
        )
      }

      return { previousAssetLocations, previousAssetLocation }
    },
    onSuccess: async () => {
      toast.success(
        <Text as="b">{t("form-asset-location-successfully-updated")}</Text>
      )
      router.refresh()
    },
    onError: (err, variables, context) => {
      if (context?.previousAssetLocations) {
        const queryKey = [
          ASSET_LOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetLocations)
      }
      if (context?.previousAssetLocation && variables.id) {
        queryClient.setQueryData(
          ASSET_LOCATION_KEYS.detail(variables.id),
          context.previousAssetLocation
        )
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: ASSET_LOCATION_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteAssetLocation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (id: number) => AssetLocationService.delete(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_LOCATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetLocations =
        queryClient.getQueryData<AssetLocationPaginator>(queryKey)

      queryClient.setQueryData<AssetLocationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        }
      })

      return { previousAssetLocations }
    },

    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-asset-location-successfully-deleted")}</Text>
      )
    },

    onError: (err, variables, context) => {
      // toast.error(
      //   <Text as="b">{t("form-asset-location-failed-to-delete")}</Text>
      // )

      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-asset-location-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-asset-location-failed-to-delete")}
          </Text>
        );
      }

      if (context?.previousAssetLocations) {
        const queryKey = [
          ASSET_LOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetLocations)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useBulkDeleteAssetDepreciation() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (ids: number[]) => AssetLocationService.bulk(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })

      const queryKey = [
        ASSET_LOCATION_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousAssetLocations =
        queryClient.getQueryData<AssetLocationPaginator>(queryKey)
      queryClient.setQueryData<AssetLocationPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id as number)),
          count: old.count - ids.length,
        }
      })

      return { previousAssetLocations }
    },
    onSuccess: () => {
      toast.success(
        <Text as="b">{t("form-assets-location-deleted-successfully")}</Text>
      )
    },
    onError: (err, variables, context) => {
      // toast.error(
      //   <Text as="b">{t("form-assets-location-failed-to-delete")}</Text>
      // )
      // @ts-ignore
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.includes('REFERENCE constraint')) {
        toast.error(
          <Text as="b">
            {t("form-assets-location-cannot-delete-referenced")}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            {t("form-assets-location-failed-to-delete")}
          </Text>
        );
      }
      if (context?.previousAssetLocations) {
        const queryKey = [
          ASSET_LOCATION_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousAssetLocations)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ASSET_LOCATION_KEYS.all],
        exact: false,
      })
    },
  })
}
