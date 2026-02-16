"use client"

import { Avatar } from "rizzui/avatar"

import ArrowTrendUpIcon from "@/components/icons/arrow-trend-up"
import CaretRightIcon from "@/components/icons/caret-right"
import { Badge, Button } from "@/components/ui"
import { useIncomeExpensesProfit } from "@/modules/fms/hooks/use-income-expenses-profit"
import { formatCurrency } from "@/utils/format-currency"

import BoxLayout from "./box-layout"
import IncomeStatementChart from "./income-statement"

export default function TotalIncome() {
  const { data } = useIncomeExpensesProfit()

  return (
    <BoxLayout
      className="col-span-full @3xl:col-span-8"
      title="Total Income"
      isFeatured>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full @lg:col-span-5">
          <div className="flex flex-row items-start justify-between gap-7 @lg:flex-col @lg:justify-start">
            <div className="flex flex-col gap-4 @xl:gap-9">
              <div>
                <Badge
                  rounded="pill"
                  color="success"
                  variant="flat"
                  className="h-8 gap-1.5 text-base font-semibold @xl:h-10 @xl:px-3.5 @xl:text-lg">
                  <span>2.9%</span>
                  <ArrowTrendUpIcon className="h-4 w-4" />
                </Badge>
              </div>

              <div className="text-4xl font-bold leading-tight text-title @xl:text-5xl @3xl:text-[64px]">
                {data && (
                  <>
                    {formatCurrency(data?.totalIncome?.totalIncome).mainPart}
                    <span className="text-gray-500/20">
                      {formatCurrency(data?.totalIncome?.totalIncome).decimalPart}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>Top 5 company income</div>
              <div className="flex flex-col justify-between gap-4 @3xl:flex-row @3xl:items-center">
                <div>
                  {data?.topCompanies?.map((company, index) => (
                    <Avatar
                      key={company.companyId}
                      name={company.companyName}
                      src={company.logoUrl}
                      className={`relative inline-flex !size-8 object-cover @5xl:!size-10 ${
                        index > 0
                          ? `-translate-x-[${15 + (index - 1) * 5}px] ring-2 ring-background`
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden @lg:block">
                  <Button
                    rounded="pill"
                    color="black"
                    variant="flat"
                    size="sm"
                    className="h-9 gap-2 font-semibold">
                    <span>View All</span>
                    <CaretRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full @lg:col-span-7">
          <div className="chart-container">
            <IncomeStatementChart monthlyIncome={data?.monthlyIncome || []} />
          </div>
        </div>
      </div>
    </BoxLayout>
  )
}
