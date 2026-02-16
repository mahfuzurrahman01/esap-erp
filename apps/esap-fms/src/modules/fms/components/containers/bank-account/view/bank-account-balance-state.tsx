"use client"

import TransactionCard, {
  TransactionType,
} from "@core/components/cards/transaction-card"
import { PiCurrencyCircleDollar } from "react-icons/pi"
import { PiBank } from "react-icons/pi"
import { Grid } from "rizzui"

import Box from "@/components/ui/box"

const statData: TransactionType[] = [
  {
    title: "Current Balance",
    amount: "$16,085k",
    increased: true,
    percentage: "32.45",
    icon: PiCurrencyCircleDollar,
    iconWrapperFill: "#8A63D2",
  },
  {
    title: "Opening Balance",
    amount: "$25,786k",
    increased: false,
    percentage: "32.45",
    icon: PiBank,
    iconWrapperFill: "#00CEC9",
  },
]

export default function BankAccountBalanceState() {
  return (
    <>
      <Grid columns="2">
        {statData.map((stat: any, index: number) => {
          return (
            <Box key={`transaction-card-${index}`}>
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
