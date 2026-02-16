"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"
import { Text } from "rizzui"

import { createQueryKeys } from "@/server/service/query-config"

import { BankClearanceService } from "../service/bank-clearance.service"
import { BankClearance, UpdateBankClearance, BankClearanceQueryOptions } from "../types"

const BANK_CLEARANCE_KEYS = createQueryKeys("bank-clearance")

export function useBankClearanceList(query?: BankClearanceQueryOptions) {
    return useQuery<BankClearance[], Error>({
        queryKey: [...BANK_CLEARANCE_KEYS.all, query],
        queryFn: () => BankClearanceService.all(query),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: Boolean(query?.bankAccountId || query?.chartOfAccountId),
    })
}

export function useUpdateBankClearance() {
    const queryClient = useQueryClient()
    const t = useTranslations("form")

    return useMutation({
        mutationFn: (input: UpdateBankClearance) => BankClearanceService.update(input),
        onMutate: async (newBankClearance) => {
            await queryClient.cancelQueries({
                queryKey: [BANK_CLEARANCE_KEYS.all],
                exact: false,
            })

            const previousBankClearances = queryClient.getQueryData<BankClearance[]>(
                BANK_CLEARANCE_KEYS.all
            )

            return { previousBankClearances }
        },
        onSuccess: () => {
            toast.success(
                <Text as="b">{t("form-bank-clearance-updated-successfully")}</Text>
            )
        },
        onError: (err, variables, context) => {
            toast.error(
                <Text as="b">{t("form-bank-clearance-failed-to-update")}</Text>
            )
            if (context?.previousBankClearances) {
                queryClient.setQueryData(
                    BANK_CLEARANCE_KEYS.all,
                    context.previousBankClearances
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [BANK_CLEARANCE_KEYS.all],
                exact: false,
            })
        },
    })
}

export function useUpdateBankClearanceBatch() {
    const queryClient = useQueryClient()
    const t = useTranslations("form")

    return useMutation({
        mutationFn: (input: UpdateBankClearance[]) => BankClearanceService.updateBatch(input),
        onMutate: async (newBankClearances) => {
            await queryClient.cancelQueries({
                queryKey: [BANK_CLEARANCE_KEYS.all],
                exact: false,
            })

            const previousBankClearances = queryClient.getQueryData<BankClearance[]>(
                BANK_CLEARANCE_KEYS.all
            )

            return { previousBankClearances }
        },
        onSuccess: () => {
            toast.success(
                <Text as="b">{t("form-bank-clearance-batch-updated-successfully")}</Text>
            )
        },
        onError: (err, variables, context) => {
            toast.error(
                <Text as="b">{t("form-bank-clearance-batch-failed-to-update")}</Text>
            )
            if (context?.previousBankClearances) {
                queryClient.setQueryData(
                    BANK_CLEARANCE_KEYS.all,
                    context.previousBankClearances
                )
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [BANK_CLEARANCE_KEYS.all],
                exact: false,
            })
        },
    })
} 