"use client"

import React from "react"

import { useTranslations } from "next-intl"
import { priceListOptions } from "@/data/crm/quotation"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useBankAccountList } from "@/modules/fms/hooks"
import { useCompanyById } from "@/modules/fms/hooks/use-company"
import { useCurrencyById } from "@/modules/fms/hooks/use-currency"
import { BankAccountList } from "@/modules/fms/types"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"

import { AdvanceTable } from "./advance-table"
import { ItemDetailsTable } from "./item-details-table"
import { TaxTable } from "./tax-table"
import SalesInvoiceAddress from "./view/address"
import SalesInvoiceInformation from "./view/information"
import SalesInvoicePayment from "./view/payments"

export default function SalesInvoiceDetailsContainer({
  salesInvoiceData,
  printRef,
}: any) {
  const t = useTranslations("crm")
  const tForm = useTranslations("form")

  const { data: currencyData }: any = useCurrencyById(
    salesInvoiceData?.currencyId
  )
  const { data: companyData }: any = useCompanyById(salesInvoiceData?.companyId)

  const { paymentTerms } = useSCMSharedDataHook(["paymentTerms"])
  const { paymentTermsOptions } = paymentTerms

  const { accountingTypes } = useSCMSharedDataHook(["accountingTypes"])
  const { accountingTypesOptions } = accountingTypes

  function getPaymentTermLabel(value: string) {
    const option = paymentTermsOptions.find(
      (option: any) => option.value === value
    )
    return option ? option.label : "-"
  }

  function getPriceListLabel(value: string) {
    const option = priceListOptions.find(
      (option: any) => option.value === value
    )
    return option ? option.label : "-"
  }

  const { taxCharge, taxTemplate } = useSCMSharedDataHook([
    "taxCharge",
    "taxTemplate",
  ])

  const { taxChargeOptions } = taxCharge
  const { taxTemplateOptions } = taxTemplate
  const { purchaseOrder } = useSCMSharedDataHook(["purchaseOrder"])
  const { purchaseOrderOptions } = purchaseOrder
  const { warehouse } = useSCMSharedDataHook(["warehouse"])
  const { warehouseOptions } = warehouse

  const { costCenter } = useSCMSharedDataHook(["costCenter"])
  const { data: bankDetails } = useBankAccountList()
  const { costCenterOptions } = costCenter
  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankDetails?.data,
    "accountName"
  )

  function getLabel(value: string, options: any[]) {
    return options.find((option) => option.value === value)?.label || "-"
  }

  const getTaxTemplateLabel = (value: string) =>
    getLabel(value, taxTemplateOptions)
  const getTaxChargeLabel = (value: string) => getLabel(value, taxChargeOptions)
  const getPOLabel = (value: string) => getLabel(value, purchaseOrderOptions)
  const getDebitToLabel = (value: string) =>
    getLabel(value, accountingTypesOptions)
  const getWarehouseLabel = (value: string) => getLabel(value, warehouseOptions)
  const getBankAccountLabel = (value: string) =>
    getLabel(value, bankAccountOptions)
  const getCostCenterLabel = (value: string) =>
    getLabel(value, costCenterOptions)

  return <div className="card-shadow mx-auto mb-8 w-full max-w-[210mm]">
  <div
    ref={printRef}
    className="w-[210mm min-h-[297mm] divide-y divide-dashed divide-gray-500/20 p-6 shadow-sm dark:!text-gray-900"
    style={{ margin: "0 auto" }}>
    <SalesInvoiceInformation
      salesInvoiceData={salesInvoiceData}
      companyData={companyData}
      currencyData={currencyData}
      getPaymentTermLabel={getPaymentTermLabel}
    />

    <SalesInvoiceAddress salesInvoiceData={salesInvoiceData} />

    <SalesInvoicePayment
      salesInvoiceData={salesInvoiceData}
      getBankAccountLabel={getBankAccountLabel}
      getCostCenterLabel={getCostCenterLabel}
      getDebitToLabel={getDebitToLabel}
      getPriceListLabel={getPriceListLabel}
      getTaxChargeLabel={getTaxChargeLabel}
      getTaxTemplateLabel={getTaxTemplateLabel}
      getPOLabel={getPOLabel}
      getWarehouseLabel={getWarehouseLabel}
    />

    {salesInvoiceData?.invoiceProductDetailsDTOs && (
      <ItemDetailsTable data={salesInvoiceData} />
    )}

    {salesInvoiceData?.invoiceVatTaxDetailsDTOs && (
      <TaxTable data={salesInvoiceData} />
    )}

    {salesInvoiceData?.invoiceAdvancePayments && (
      <AdvanceTable data={salesInvoiceData} />
    )}
  </div>
</div>
}
