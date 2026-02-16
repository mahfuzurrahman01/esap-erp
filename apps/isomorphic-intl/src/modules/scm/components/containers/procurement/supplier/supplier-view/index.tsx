"use client"

import { useTranslations } from "next-intl"

import TabsNavigation from "@/components/base/tabs-navigation"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

import SupplierInvoice from "./step-details-five"
import ContractInfo from "./step-details-four"
import ComplianceLegalInfo from "./step-details-one"
import FinancialInfo from "./step-details-three"

type indexProps = {
  supplierData: Supplier
}

export default function SupplierDetailsNav({ supplierData }: indexProps) {
  const t = useTranslations("common")
  const tabs = [
    {
      label: t("text-compliance-and-legal-information"),

      content: <ComplianceLegalInfo supplierData={supplierData} />,
    },
    {
      label: t("text-bank-account-details"),
      content: <FinancialInfo supplierData={supplierData} />,
    },

    {
      label: t("text-contract-information"),
      content: <ContractInfo supplierData={supplierData} />,
    },

    {
      label: t("text-invoice-information"),
      content: <SupplierInvoice supplierData={supplierData} />,
    },
  ]

  return (
    <div className="card-shadow mx-4 my-4 py-4 @container">
      <TabsNavigation tabs={tabs} className="flex-grow" />
    </div>
  )
}
