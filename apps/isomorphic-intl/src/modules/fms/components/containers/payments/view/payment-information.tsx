"use client"

import React from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Skeleton } from "@/components/ui/skeleton"
import Badge from "@/components/ui/badge"

import PreviewHeader from "@/components/ui/preview/preview-header"
import { PreviewItem } from "@/components/ui/preview/preview-item"
import Box from "@/components/ui/box"
import BoxContainer from "@/components/ui/box-container"
import BoxGroup from "@/components/ui/box-group"
import { PaymentList } from "@/modules/fms/types"

import { PaymentReferenceTable } from "../payment-reference/payment-reference-table"
import { PaymentTaxAndChargeTable } from "../payment-tax-and-charge/payment-tax-and-charge-table"
import { DeductionsOrLossTable } from "../deductions-or-loss/deductions-or-loss-table"
import PDFLayout from "./pdf-layout"
interface PreviewItemConfig {
  key: string
  label: string
  format?: (value: any) => string
  skip?: boolean
}

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Submitted":
      return "primary"
    case "Paid":
      return "success"
    case "Cleared":
      return "success"
    case "Cancelled":
      return "error"
    default:
      return "gray"
  }
}

const PaymentInformation = React.forwardRef<
  HTMLDivElement,
  { data?: PaymentList }
>(({ data }, ref) => {
  const t = useTranslations("common")

  const previewItems: PreviewItemConfig[] = [
    { key: "transactionType", label: "text-transaction-type" },
    { key: "postingDate", label: "text-transaction-date", format: (value) => value ? dayjs(value).format("DD-MM-YYYY") : "--" },
    { key: "companyBankAccount.accountName", label: "text-company-bank-account" },
    { key: "modeOfPayment.modeOfPaymentName", label: "text-mode-of-payment" },
    { key: "partyType", label: "text-party-type" },
    { key: "partyName", label: "text-party-name" },
    { key: "partyBankAccount.accountName", label: "text-party-bank-account" },
    { key: "fromCurrency.currencyName", label: "text-from-currency" },
    { key: "toCurrency.currencyName", label: "text-to-currency" },
    { key: "referenceNumber", label: "text-reference-number" },
    {
      key: "referenceDate",
      label: "text-reference-date",
      format: (value) => value ? dayjs(value).format("DD-MM-YYYY") : "--"
    },
    { key: "paymentStatus", label: "text-status" },
    { key: "paymentAmount", label: "text-amount" },
    { key: "unallocatedAmount", label: "text-unallocated-amount" },
    { key: "totalTax", label: "text-total-tax" },
  ]

  const renderSkeleton = () => (
    <>
      <BoxGroup
        title={t("text-payment-details")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <ul className="grid grid-cols-2 gap-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <li key={index} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-48" />
            </li>
          ))}
        </ul>
      </BoxGroup>

      <BoxGroup
        title={t("text-payment-reference")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </BoxGroup>

      <BoxGroup
        title={t("text-payment-tax-and-charge")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </BoxGroup>

      <BoxGroup
        title={t("text-payment-deduction-and-loss")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </BoxGroup>
    </>
  )

  if (!data) {
    return (
      <Box className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11">
        <BoxContainer>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
          {renderSkeleton()}
        </BoxContainer>
      </Box>
    )
  }

  const renderPreviewItems = () => {
    return previewItems
      .filter(item => {
        const value = getNestedValue(data, item.key)
        return !Array.isArray(value) && value != null && value !== ''
      })
      .map(item => {
        if (item.key === "paymentStatus") {
          return (
            <PreviewItem
              key={item.key}
              label={t(item.label)}
              value={
                <Badge variant="flat" rounded="lg" color={getBadgeColorByStatus(getNestedValue(data, item.key) as string)}>
                  {getNestedValue(data, item.key) as string}
                </Badge>
              }
            />
          )
        }
        return (
          <PreviewItem
            key={item.key}
            label={t(item.label)}
            value={
              item.format
                ? item.format(getNestedValue(data, item.key))
                : (getNestedValue(data, item.key) as string | number) || "--"
            }
          />
        )
      })
  }

  return (
    <Box
      className="print-content print:non-scrollable flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11"
      ref={ref}>
      <BoxContainer>
        <PreviewHeader
          title={t("text-payment-entry")}
          subtitle={data?.paymentNo || ""}
        />
        <BoxGroup
          title={t("text-payment-details")}
          className="pt-4 @2xl:pt-7 @3xl:pt-9"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <ul className="grid grid-cols-2 gap-y-3">
            {renderPreviewItems()}
          </ul>
        </BoxGroup>

        {(data?.paymentReferences?.length ?? 0) > 0 && (
          <BoxGroup
            title={t("text-payment-reference")}
            className="pt-4 @2xl:pt-7 @3xl:pt-9"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
            <PaymentReferenceTable
              data={data.paymentReferences}
              isFieldDisabled
            />
          </BoxGroup>
        )}

        {(data?.paymentTaxCharges?.length ?? 0) > 0 && (
          <BoxGroup
            title={t("text-payment-tax-and-charge")}
            className="pt-4 @2xl:pt-7 @3xl:pt-9"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
            <PaymentTaxAndChargeTable
              data={data.paymentTaxCharges}
              isFieldDisabled
            />
          </BoxGroup>
        )}

        {(data?.paymentDeductionAndLosses?.length ?? 0) > 0 && (
          <BoxGroup
            title={t("text-payment-deduction-and-loss")}
            className="pt-4 @2xl:pt-7 @3xl:pt-9"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
            <DeductionsOrLossTable
              data={data.paymentDeductionAndLosses}
              isFieldDisabled
            />
          </BoxGroup>
        )}
      </BoxContainer>
    </Box>
  )
})

PaymentInformation.displayName = "PaymentInformation"

// Helper function to get nested values
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((o, i) => o?.[i], obj)
}

export default PaymentInformation
