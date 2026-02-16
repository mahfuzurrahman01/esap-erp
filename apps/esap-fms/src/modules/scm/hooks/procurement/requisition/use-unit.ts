"use client";

import { useCallback } from "react";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { ItemUnitService } from "@/modules/scm/service/procurement/requisition/item-unit.service";
import {
  ItemUnit,
  ItemUnitPaginator,
  ItemUnitQueryOptions,
} from "@/modules/scm/types/procurement/requisition/item-unit-types";
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config";

const UNIT_KEYS = createQueryKeys("unit");

export function useUnitList(options?: Partial<ItemUnitQueryOptions>) {
  const queryKey = [UNIT_KEYS.all, options];

  return useQuery<ItemUnitPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return ItemUnitService.all(Object.assign({}, queryKey[1], pageParam));
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useUnitById(id: number) {
  return useQuery({
    queryKey: [UNIT_KEYS.detail(id)],
    queryFn: () => ItemUnitService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    mutationFn: (data: ItemUnit): Promise<ItemUnit> =>
      ItemUnitService.create(data),
    onMutate: async (newUnit) => {
      await queryClient.cancelQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
      const queryKey = [
        UNIT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];
      const previousUnit =
        queryClient.getQueryData<ItemUnitPaginator>(queryKey);
      queryClient.setQueryData<ItemUnitPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newUnit],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          };
        return {
          ...old,
          data: [...old.data, { ...newUnit, id: Date.now() }],
          count: old.count + 1,
        };
      });
      return { previousUnit };
    },
    onSuccess: () => {
      toast.success(t("form-successfully-created"));
    },
    onError: (err: any, newUnit, context) => {
      if (context?.previousUnit) {
        const queryKey = [
          UNIT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(queryKey, context.previousUnit);
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"));
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"));
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"));
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"));
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"));
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"));
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"));
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"));
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"));
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"));
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"));
      } else {
        toast.error(err.response?.data || t("form-unknown-error"));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    mutationFn: ({ data }: { data: ItemUnit }) => ItemUnitService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
      await queryClient.cancelQueries({
        queryKey: [UNIT_KEYS.detail(data.id!)],
      });
      const queryKey = [
        UNIT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];
      const previousUnit =
        queryClient.getQueryData<ItemUnitPaginator>(queryKey);
      const previousUnitDetail = queryClient.getQueryData<ItemUnit>(
        UNIT_KEYS.detail(data.id!)
      );
      queryClient.setQueryData<ItemUnitPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [data as unknown as ItemUnit],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          };
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          ),
        };
      });
      queryClient.setQueryData(UNIT_KEYS.detail(data.id!), data);
      return { previousUnit, previousUnitDetail };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousUnit) {
        const queryKey = [
          UNIT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(queryKey, context.previousUnit);
      }
      if (context?.previousUnitDetail) {
        queryClient.setQueryData(
          [UNIT_KEYS.detail(variables.data.id!)],
          context.previousUnitDetail
        );
      }
      if (err.response?.status === 400) {
        toast.error(t("form-data-already-exists"));
      } else if (err.response?.status === 404) {
        toast.error(t("form-not-found"));
      } else if (err.response?.status === 403) {
        toast.error(t("form-forbidden"));
      } else if (err.response?.status === 401) {
        toast.error(t("form-unauthorized"));
      } else if (err.response?.status === 409) {
        toast.error(t("form-conflict"));
      } else if (err.response?.status === 422) {
        toast.error(t("form-validation-failed"));
      } else if (err.response?.status === 429) {
        toast.error(t("form-too-many-requests"));
      } else if (err.response?.status === 500) {
        toast.error(t("form-server-error"));
      } else if (err.response?.status === 502) {
        toast.error(t("form-bad-gateway"));
      } else if (err.response?.status === 503) {
        toast.error(t("form-service-unavailable"));
      } else if (err.response?.status === 504) {
        toast.error(t("form-gateway-timeout"));
      } else {
        toast.error(err.response?.data || t("form-unknown-error"));
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [UNIT_KEYS.detail(data.id!)],
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [UNIT_KEYS.all] });
      queryClient.invalidateQueries({
        queryKey: [UNIT_KEYS.detail(data.id!)],
      });
      toast.success(t("form-successfully-update"));
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    mutationFn: (id: number) => ItemUnitService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });

      const queryKey = [
        UNIT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];

      // Snapshot the previous value
      const previousUnit =
        queryClient.getQueryData<ItemUnitPaginator>(queryKey);

      // Optimistically remove the COA from the list
      queryClient.setQueryData<ItemUnitPaginator>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
          count: old.count - 1,
        };
      });

      return { previousUnit };
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"));
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUnit) {
        const queryKey = [
          UNIT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(queryKey, context.previousUnit);
      }
      toast.error(err.message || t("form-error-deleting-dependency"));
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
    },
  });
}

export function useBulkDeleteUnit() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) => ItemUnitService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });

      const queryKey = [
        UNIT_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];

      // Snapshot the previous value
      const previousUnit =
        queryClient.getQueryData<ItemUnitPaginator>(queryKey);

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<ItemUnitPaginator>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((item) => !ids.includes(item.id!)),
          count: old.count - ids.length,
        };
      });

      return { previousUnit };
    },

    onSuccess: (_, ids) => {
      const count = ids.length;
      toast.success(
        count === 1
          ? t("form-successfully-deleted")
          : t("form-successfully-bulk-deleted", { count })
      );
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUnit) {
        const queryKey = [
          UNIT_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(queryKey, context.previousUnit);
      }
      toast.error(t("form-error-bulk-delete"));
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [UNIT_KEYS.all],
        exact: false,
      });
    },
  });
}

export function useUnitOperations() {
  const queryClient = useQueryClient();

  const invalidateUnitQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["unit-list"] });
  }, [queryClient]);

  return {
    invalidateUnitQueries,
  };
}
