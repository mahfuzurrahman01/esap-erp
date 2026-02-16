"use client"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { useMedia } from "react-use"
import { Tab } from "rizzui"

import AccountingIcon from "@/components/icons/accounting"
import AssetIcon from "@/components/icons/assets"
import BankingIcon from "@/components/icons/banking"
import BudgetIcon from "@/components/icons/budgeting"
import PayrollConfigurationIcon from "@/components/icons/hrms/payroll-configuration"
import PaymentIcon from "@/components/icons/payment"
import ReportingIcon from "@/components/icons/reporting"
import ComplianceIcon from "@/components/icons/tax"
import TaxIcon from "@/components/icons/tax"

import AssetOverflow from "./asset-overflow"
import BankingOverflow from "./banking-overflow"
import BudgetOverflow from "./budget-overflow"
import CurrencyOverflow from "./currency-overflow"
import FinancialReportingOverflow from "./financial-reporting-overflow"
import FMSDoc from "./fms-doc"
import PaymentOverflow from "./payment-overflow"
import TaxOverflow from "./tax-overflow"

const DOCUMENT_COMPONENTS: any[] = [
  FMSDoc,
  BudgetOverflow,
  AssetOverflow,
  BankingOverflow,
  PaymentOverflow,
  CurrencyOverflow,
  TaxOverflow,
  FinancialReportingOverflow,
]

export default function DocumentationContainer() {
  const t = useTranslations("common")
  const isMobile = useMedia("(max-width: 480px)", false)

  const steps = [
    {
      title: t("text-financial-management"),
      icon: <AccountingIcon className="h-6 w-6" />,
    },
    {
      title: t("text-budget-management"),
      icon: <BudgetIcon className="h-6 w-6" />,
    },
    {
      title: t("text-asset-management"),
      icon: <AssetIcon className="h-6 w-6" />,
    },
    {
      title: t("text-banking"),
      icon: <BankingIcon className="h-6 w-6" />,
    },
    {
      title: t("text-payments"),
      icon: <PaymentIcon className="h-6 w-6" />,
    },
    {
      title: t("text-currency"),
      icon: <PayrollConfigurationIcon className="h-6 w-6" />,
    },
    {
      title: t("text-tax"),
      icon: <TaxIcon className="h-6 w-6" />,
    },
    {
      title: t("text-financial-reporting"),
      icon: <ReportingIcon className="h-6 w-6" />,
    },
  ]

  return (
    <Tab
      highlightClassName="rounded-lg duration-200 bg-primary/[8%] font-semibold"
      className="crm-doc-tab pb-6"
      vertical>
      <Tab.List className={cn(isMobile ? "w-1/4" : "", "gap-0")}>
        {steps.map(({ title, icon }, index) => (
          <Tab.ListItem
            key={index}
            className="flex items-center gap-2 py-4 pe-4 ps-0">
            {icon}
            {isMobile && title.length > 6
              ? `${title.substring(0, 6)}...`
              : title}
          </Tab.ListItem>
        ))}
      </Tab.List>
      <Tab.Panels className="w-4/5 px-4 py-0">
        {steps.map(({ title }, index) => {
          const Component =
            DOCUMENT_COMPONENTS[index] ||
            (() => (
              <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="py-2">Coming soon...</p>
              </div>
            ))
          return (
            <Tab.Panel key={index}>
              <Component />
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    </Tab>
  )
}
