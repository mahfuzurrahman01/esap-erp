"use client"

import { Grid } from "rizzui"

import TransactionCard, {
  TransactionType,
} from "@/components/base/transaction-card"
import Box from "@/components/ui/box"
import { ProfitAndLossResponse } from "@/modules/fms/types"

export default function ProfitAndLossState({
  profitAndLoss,
}: {
  profitAndLoss?: ProfitAndLossResponse
}) {
  const statData: TransactionType[] = [
    {
      title: "Total Income",
      amount: profitAndLoss?.totalIncome ? `$${profitAndLoss.totalIncome.toLocaleString()}` : "$0.00",
      amountColor: "#00A76F",
    },
    {
      title: "Total Expenses",
      amount: profitAndLoss?.totalExpense ? `$${profitAndLoss.totalExpense.toLocaleString()}` : "$0.00",
      amountColor: "#FFAB00",
    },
    {
      title: "Profit & Loss",
      amount: profitAndLoss?.profit ? `$${profitAndLoss.profit.toLocaleString()}` : "$0.00",
      amountColor: "#8E33FF",
    },
  ]

  return (
    <>
      <Grid columns="4">
        {statData.map((stat: any, index: number) => {
          return (
            <Box
              key={`transaction-card-${index}`}
              className="mt-0 border-gray-500/20 shadow-none md:mt-0">
              <TransactionCard
                transaction={stat}
                className="min-w-[300px] rounded-2xl border-transparent"
              />
            </Box>
          )
        })}
      </Grid>
    </>
  )
}
