"use client"

import { Grid } from "rizzui"

import TransactionCard, {
  TransactionType,
} from "@/components/base/transaction-card"
import Box from "@/components/ui/box"
import { useCashFlowSummary } from "@/modules/fms/hooks/use-cash-flow-summary"
import { formatNumber } from "@core/utils/format-number"
import { useQueryParams } from "@/hooks/use-query-params"
import { CashFlowQueryOptions } from "@/modules/fms/types/cash-flow"

export default function CashFlowState() {
  const { params } = useQueryParams<CashFlowQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => value || "",
      },
    ],
  })

  const { data: cashFlowSummary } : any = useCashFlowSummary(params?.companyId ? { companyId: params.companyId } : undefined)
  const summary = cashFlowSummary?.[0]?.summary

  const statData: TransactionType[] = [
    {
      title: "Net Cash from Operations",
      amount: formatNumber(summary?.totalNetOperations || 0),
      amountColor: "#00A76F",
    },
    {
      title: "Net Cash from Investing",
      amount: formatNumber(summary?.totalNetInvestment || 0),
      amountColor: "#FFAB00",
    },
    {
      title: "Net Cash from Financing",
      amount: formatNumber(summary?.totalNetFinance || 0),
      amountColor: "#00B8D9",
    },
    {
      title: "Net Change in Cash",
      amount: formatNumber(
        (summary?.totalNetOperations || 0) +
        (summary?.totalNetInvestment || 0) +
        (summary?.totalNetFinance || 0)
      ),
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