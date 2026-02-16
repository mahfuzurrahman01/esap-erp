"use client"

import { useTranslations } from "next-intl"
import { Grid } from "rizzui"
import { useAtom } from "jotai"

import TransactionCard, {
  TransactionType,
} from "@/components/base/transaction-card"
import Box from "@/components/ui/box"
import { useBankReconciliation } from "@/modules/fms/hooks/use-bank-reconciliation"
import { closingBalanceAsPerBankStatementAtom } from "@/modules/fms/store/bank-reconciliation-store"
import { BankReconciliation } from "@/modules/fms/types/bank-reconciliation"

export default function BankReconciliationState({ bankReconciliationData }: { bankReconciliationData: BankReconciliation }) {
  const t = useTranslations("form")
  const [closingBalanceAsPerBankStatement] = useAtom(closingBalanceAsPerBankStatementAtom)


  const closingBalanceAsPerERP = bankReconciliationData?.closingBalanceAsPerERP || 0
  const difference = closingBalanceAsPerERP - closingBalanceAsPerBankStatement

  console.log('closingBalanceAsPerERP', closingBalanceAsPerERP)

  const statData: TransactionType[] = [
    {
      title: t("form-closing-balance-as-per-bank-statement"),
      amount: `$${closingBalanceAsPerBankStatement.toFixed(2)}`,
      amountColor: "text-title",
    },
    {
      title: t("form-closing-balance-as-per-erp"),
      amount: `$${closingBalanceAsPerERP.toFixed(2)}`,
      amountColor: "text-title",
    },
    {
      title: t("form-difference"),
      amount: `$${difference.toFixed(2)}`,
      amountColor: difference < 0 ? "#FF5630" : "text-title",
    },
  ]

  return (
    <Grid columns="3">
      {statData.map((stat: any, index: number) => {
        return (
          <Box
            key={`transaction-card-${index}`}
            className="mt-0 border-gray-500/20 shadow-none md:mt-0">
            <TransactionCard
              transaction={stat}
              className="min-w-[300px] rounded-2xl border-transparent"
              amountClassName=""
            />
          </Box>
        )
      })}
    </Grid>
  )
}
