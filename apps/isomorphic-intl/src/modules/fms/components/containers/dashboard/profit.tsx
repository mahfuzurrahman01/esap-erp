"use client"

import React from "react"
import { Select } from "@/components/ui"
import { useQueryParams } from "@/hooks/use-query-params"
import { useTranslations } from "next-intl"

import { useCompanyWiseProfit } from "@/modules/fms/hooks/use-company-wise-profit"
import { CompanyWiseProfitQueryOptions } from "@/modules/fms/types/company-wise-profit"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import { formatCurrency } from "@/utils/format-currency"

import BoxLayout from "./box-layout"
import RadialBarChart from "./radial-bar-chart"

export default function Profit() {
  const t = useTranslations("form")
  const { company } = useSharedDataHooks(["company"])
  const { companyOptions = [], isCompanyLoading } = company

  // Query params setup for company filter
  const { params, updateParams } = useQueryParams<CompanyWiseProfitQueryOptions>({
    params: [
      {
        key: "companyId",
        defaultValue: "",
        parse: (value) => Number(value) || "",
      },
    ],
  })

  // Fetch profit data based on selected company
  const { data: companyWiseProfit, isLoading: isProfitLoading } = useCompanyWiseProfit(
    params?.companyId ? { companyId: params.companyId } : undefined
  )

  // Handle company selection change
  const handleCompanyChange = (option: any) => {
    updateParams?.({
      companyId: option?.value || "",
    })
  }

  // Get selected company option
  const selectedCompany = companyOptions.find(
    (option: any) => option.value === params?.companyId
  )

  return (
    <BoxLayout
      className="col-span-full @3xl:col-span-4"
      title="Profit"
      headingRight={
        <Select
          labelClassName="text-title"
          options={companyOptions}
          value={selectedCompany || null}
          onChange={handleCompanyChange}
          isLoading={isCompanyLoading}
          isDisabled={isCompanyLoading}
          placeholder={
            isCompanyLoading
              ? "Loading companies..."
              : t("form-select-company")
          }
          className="min-w-[180px]"
          menuPortalTarget={document.body}
        />
      }>
      <div className="space-y-6">
        <RadialBarChart
          companyWiseProfit={companyWiseProfit}
          isLoading={isProfitLoading}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            {companyWiseProfit && (
              <div className="flex items-center gap-2 text-title">
                <div className={`h-2.5 w-2.5 rounded-full ${companyWiseProfit.profitPercentage >= 0 ? 'bg-primary' : 'bg-red'}`} />
                <span>{companyWiseProfit.companyName}</span>
              </div>
            )}
          </div>

          <h2 className="text-[40px] font-bold leading-tight text-title">
            {companyWiseProfit ? (
              <>
                {formatCurrency(companyWiseProfit.totalProfit).mainPart}
                <span className="text-gray-500">
                  {formatCurrency(companyWiseProfit.totalProfit).decimalPart}
                </span>
              </>
            ) : (
              <>
                $0<span className="text-gray-500">.00</span>
              </>
            )}
          </h2>
        </div>
      </div>
    </BoxLayout>
  )
}
