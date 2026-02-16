"use client";

import { useRouter } from "next/navigation";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants";
import { routes } from "@/config/routes";
import { PurchasedOrderApprovalService } from "@/modules/scm/service/procurement/purchased-order/purchased-order-approval.service";
import {
  PurchasedOrderApproval,
  PurchasedOrderApprovalPaginator,
  PurchasedOrderApprovalQueryOptions,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types";
import {
  PurchasedOrder,
  PurchasedOrderPaginator,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import {
  DEFAULT_QUERY_OPTIONS,
  createQueryKeys,
} from "@/server/service/query-config";

const PURCHASED_ORDER_APPROVAL_KEYS = createQueryKeys(
  "purchased-order-approval"
);

const PURCHASED_ORDER_KEYS = createQueryKeys("purchased-order");

export function usePurchasedOrderApprovalList(
  options?: Partial<PurchasedOrderApprovalQueryOptions>
) {
  const queryKey = [PURCHASED_ORDER_APPROVAL_KEYS.all, options];

  return useQuery<PurchasedOrderApprovalPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return PurchasedOrderApprovalService.all(
        Object.assign({}, queryKey[1], pageParam)
      );
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function usePurchasedOrderApprovalById(id: number) {
  return useQuery({
    queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.detail(id)],
    queryFn: () => PurchasedOrderApprovalService.get(id),
    enabled: !!id,
    ...DEFAULT_QUERY_OPTIONS,
  });
}

export function useCreatePurchasedOrderApproval() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("form");

  return useMutation({
    mutationFn: (
      data: PurchasedOrderApproval
    ): Promise<PurchasedOrderApproval> =>
      PurchasedOrderApprovalService.create(data),
    onMutate: async (newPurchasedOrderApproval) => {
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      });
      const queryKey = [
        PURCHASED_ORDER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];
      const previousPurchasedOrder =
        queryClient.getQueryData<PurchasedOrderPaginator>(queryKey);
      queryClient.setQueryData<PurchasedOrderPaginator>(queryKey, (old) => {
        if (!old)
          return {
            data: [newPurchasedOrderApproval as unknown as PurchasedOrder],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          };
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newPurchasedOrderApproval,
              id: Date.now(),
            } as unknown as PurchasedOrder,
          ],
          count: old.count + 1,
        };
      });
      return { previousPurchasedOrder };
    },
    onSuccess: () => {
      router.push(routes.scm.procurement.purchaseOrders.purchaseOrders);
      toast.success(t("form-successfully-created"));
    },
    onError: (err: any, newPurchasedOrderApproval, context) => {
      if (context?.previousPurchasedOrder) {
        const queryKey = [
          PURCHASED_ORDER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(queryKey, context.previousPurchasedOrder);
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
        queryKey: [PURCHASED_ORDER_KEYS.all],
        exact: false,
      });
    },
  });
}

export function useUpdatePurchasedOrderApproval() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("form");
  return useMutation({
    mutationFn: ({ data }: { data: PurchasedOrderApproval }) =>
      PurchasedOrderApprovalService.update(data),
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });
      await queryClient.cancelQueries({
        queryKey: PURCHASED_ORDER_APPROVAL_KEYS.detail(data.id!),
      });
      const queryKey = [
        PURCHASED_ORDER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];
      const previousPurchasedOrderApproval =
        queryClient.getQueryData<PurchasedOrderApprovalPaginator>(queryKey);
      const previousPurchasedOrderApprovalDetail =
        queryClient.getQueryData<PurchasedOrderApproval>(
          PURCHASED_ORDER_APPROVAL_KEYS.detail(data.id!)
        );
      queryClient.setQueryData<PurchasedOrderApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old)
            return {
              data: [data],
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
        }
      );
      queryClient.setQueryData(
        PURCHASED_ORDER_APPROVAL_KEYS.detail(data.id!),
        data
      );
      return {
        previousPurchasedOrderApproval,
        previousPurchasedOrderApprovalDetail,
      };
    },
    onError: (err: any, variables, context) => {
      if (context?.previousPurchasedOrderApproval) {
        const queryKey = [
          PURCHASED_ORDER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(
          queryKey,
          context.previousPurchasedOrderApproval
        );
      }
      if (context?.previousPurchasedOrderApprovalDetail) {
        queryClient.setQueryData(
          PURCHASED_ORDER_APPROVAL_KEYS.detail(variables.data.id!),
          context.previousPurchasedOrderApprovalDetail
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
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.detail(data.id!)],
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
      });
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.detail(data.id!)],
      });
      router.push(routes.scm.procurement.setting.purchaseOrderApproval);
      toast.success(t("form-successfully-updated"));
    },
  });
}

export function useDeletePurchasedOrderApproval() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    mutationFn: (id: number) => PurchasedOrderApprovalService.delete(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });

      const queryKey = [
        PURCHASED_ORDER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];

      // Snapshot the previous value
      const previousPurchasedOrderApproval =
        queryClient.getQueryData<PurchasedOrderApprovalPaginator>(queryKey);

      // Optimistically remove the COA from the list
      queryClient.setQueryData<PurchasedOrderApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            count: old.count - 1,
          };
        }
      );

      return { previousPurchasedOrderApproval };
    },

    onSuccess: () => {
      toast.success(t("form-successfully-deleted"));
    },

    onError: (err, variables, context) => {
      toast.error(t("form-error-deleting-dependency"));
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPurchasedOrderApproval) {
        const queryKey = [
          PURCHASED_ORDER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(
          queryKey,
          context.previousPurchasedOrderApproval
        );
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });
    },
  });
}

export function useBulkDeletePurchasedOrderApproval() {
  const queryClient = useQueryClient();
  const t = useTranslations("form");

  return useMutation({
    // Change mutationFn to accept an array of IDs
    mutationFn: (ids: number[]) =>
      PurchasedOrderApprovalService.bulkDelete(ids),
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });

      const queryKey = [
        PURCHASED_ORDER_APPROVAL_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ];

      // Snapshot the previous value
      const previousPurchasedOrderApproval =
        queryClient.getQueryData<PurchasedOrderApprovalPaginator>(queryKey);

      // Optimistically remove multiple items from the list
      queryClient.setQueryData<PurchasedOrderApprovalPaginator>(
        queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((item) => !ids.includes(item.id!)),
            count: old.count - ids.length,
          };
        }
      );

      return { previousPurchasedOrderApproval };
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
      if (context?.previousPurchasedOrderApproval) {
        toast.error(t("form-error-deleting-dependency"));
        const queryKey = [
          PURCHASED_ORDER_APPROVAL_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ];
        queryClient.setQueryData(
          queryKey,
          context.previousPurchasedOrderApproval
        );
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [PURCHASED_ORDER_APPROVAL_KEYS.all],
        exact: false,
      });
    },
  });
}
