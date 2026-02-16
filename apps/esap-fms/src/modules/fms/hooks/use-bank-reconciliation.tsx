"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { createQueryKeys } from "@/server/service/query-config"

import { BankReconciliationService } from "../service/bank-reconciliation.service"
import {
    BankReconciliation,
    BankReconciliationQueryOptions,
    ReconciliationUpdatePayload,
    UnreconciledPayment,
    UnreconciledPaymentQueryOptions,
} from "../types"

const BANK_RECONCILIATION_KEYS = createQueryKeys("bank-reconciliation")

export function useBankReconciliation(query?: BankReconciliationQueryOptions) {
    return useQuery<BankReconciliation, Error>({
        queryKey: [...BANK_RECONCILIATION_KEYS.all, query],
        queryFn: () => BankReconciliationService.all(query),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: Boolean(query?.bankAccountId && query?.companyId),
    })
}

export function useBankReconciliationUpdate() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, { id: number; data: ReconciliationUpdatePayload[] }>({
        mutationFn: ({ id, data }) => BankReconciliationService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BANK_RECONCILIATION_KEYS.all })
        },
    })
}

export function useUnreconciledPayments(query: UnreconciledPaymentQueryOptions) {
    return useQuery<UnreconciledPayment[], Error>({
        queryKey: [...BANK_RECONCILIATION_KEYS.all, "unreconciled-payments", query],
        queryFn: () => BankReconciliationService.getUnreconciledPayments(query),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })
} 