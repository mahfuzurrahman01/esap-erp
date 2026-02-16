"use client"

import { Grid } from "rizzui"

import TransactionCard, {
  TransactionType,
} from "@/components/base/transaction-card"
import Box from "@/components/ui/box"
import { BalanceSheetResponse } from "@/modules/fms/types/balance-sheet"

export default function BalanceSheetState({
  balanceSheet,
}: {
  balanceSheet?: BalanceSheetResponse
}) {
  const statData: TransactionType[] = [
    {
      title: "Total Assets",
      amount: balanceSheet ? `$${balanceSheet.totalAssets.toLocaleString()}` : "$0.00",
      amountColor: "#00A76F",
    },
    {
      title: "Total Liabilities",
      amount: balanceSheet ? `$${balanceSheet.totalLiabilities.toLocaleString()}` : "$0.00",
      amountColor: "#FFAB00",
    },
    {
      title: "Total Equity",
      amount: balanceSheet ? `$${balanceSheet.totalEquity.toLocaleString()}` : "$0.00",
      amountColor: "#00B8D9",
    },
    {
      title: "Provisional Profit & Loss",
      amount: balanceSheet ? `$${balanceSheet.provisionalPnL.toLocaleString()}` : "$0.00",
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
