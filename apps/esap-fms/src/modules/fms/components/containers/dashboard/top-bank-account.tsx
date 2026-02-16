"use client"

import Link from "next/link"
import { useState } from "react"

import { PiPlusBold } from "react-icons/pi"
import { ActionIcon } from "rizzui/action-icon"
import SimpleBar from "simplebar-react"
import { routes } from "@/config/routes"
import { useTopBankAccounts } from "@/modules/fms/hooks/use-top-bank-accounts"

import BankTransactionChart from "./bank-transaction-chart"
import BoxLayout from "./box-layout"
import TopBankAccountItem from "./top-bank-account-item"

export default function TopBankAccount() {
  const [activeAccountIndex, setActiveAccountIndex] = useState<number>(0)

  const { data: topBankAccounts } : any = useTopBankAccounts()
  const transactionHistory = topBankAccounts && topBankAccounts?.length > 0 ? topBankAccounts[activeAccountIndex]?.transactionHistory : []
  const currentBalance = topBankAccounts && topBankAccounts?.length > 0 ? topBankAccounts[activeAccountIndex]?.currentBalance : 0

  function formatNumberWithSuffix(num: number) {
    if (num >= 1_000_000) {
      return [(num / 1_000_000).toFixed(1).replace(/\.0$/, ""), "M"];
    }
    if (num >= 1_000) {
      return [(num / 1_000).toFixed(0), "K"];
    }
    return [num.toString(), ""];
  }
  const [formattedNumber, suffix] = formatNumberWithSuffix(currentBalance);
  
  return (
    <BoxLayout
      title="Top Bank Account"
      className="col-span-full @3xl:col-span-8 @7xl:pb-6"
      headingClassName="@xl:pb-6"
      headingRight={
        <Link href={routes.fms.createBankAccount}>
          <ActionIcon
            size="lg"
            variant="outline"
            rounded="full"
            className="shrink-0 grow-0 basis-auto border-gray-500/20 text-title @2xl:h-16 @2xl:w-16">
            <PiPlusBold size={24} />
          </ActionIcon>
        </Link>
      }>
      <SimpleBar>
        <div className="min-w-[680px]">
          <div className="grid grid-cols-3 gap-4 pt-6 @xl:pt-10 @3xl:gap-6">
          {topBankAccounts && topBankAccounts?.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => setActiveAccountIndex(index)}
                className="cursor-pointer">
                <TopBankAccountItem
                  title={item.accountName || ""}
                  type={item.bankName || ""}
                  isActive={activeAccountIndex === index}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 items-center gap-10 pt-8">
            <div className="col-span-3 text-lg font-bold text-title @2xl:text-2xl">
              Transaction History
            </div>
            <div className="col-span-6">
              <BankTransactionChart transactionHistory={transactionHistory} />
            </div>
            <div className="col-span-3">
              {/* <Badge
                rounded="pill"
                color="danger"
                variant="flat"
                className="h-8 gap-1.5 text-lg font-semibold @2xl:h-10 @2xl:px-3.5">
                <span>3.5%</span>
                <ArrowTrendDownIcon className="h-4 w-4" />
              </Badge> */}
              <div className="text-5xl font-bold leading-tight text-title @2xl:text-[64px]">
                {formattedNumber}
                {suffix && <span className="text-gray-500/20">{suffix}</span>}
              </div>
              <span className="block pt-6 text-base">Current Balance</span>
            </div>
          </div>
        </div>
      </SimpleBar>
    </BoxLayout>
  )
}
