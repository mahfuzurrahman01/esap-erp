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
import { PaymentRequestList } from "@/modules/fms/types"

interface PreviewItemConfig {
  key: string
  label: string
  format?: (value: any) => string
  skip?: boolean
}

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Draft":
      return "black"
    case "Submitted":
      return "info"
    case "Approved":
      return "success"
    case "Partially Paid":
      return "warning"
    case "Paid":
      return "primary"
    case "Failed":
      return "danger"
    case "Cancelled":
      return "danger"
    default:
      return "default"
  }
}

const PaymentRequestInformation = React.forwardRef<
  HTMLDivElement,
  { data?: PaymentRequestList }
>(({ data }, ref) => {
  const t = useTranslations("common")

  const previewItems: PreviewItemConfig[] = [
    { key: "bankName", label: "text-bank-name" },
    { key: "paymentRequestType", label: "text-payment-type" },
    { key: "company.companyName", label: "text-company-name" },
    { key: "modeOfPayment.modeOfPaymentName", label: "text-mode-of-payment" },
    { key: "partyAccountCurrency.currencyName", label: "text-party-account-currency" },
    { key: "transactionCurrency.currencyName", label: "text-transaction-currency" },
    {
      key: "transactionDate",
      label: "text-transaction-date",
      format: (value) => value ? dayjs(value).format("DD-MM-YYYY") : "--"
    },
    { key: "partyType", label: "text-party-type" },
    { key: "partyName", label: "text-party-name" },
    { key: "referenceType", label: "text-reference-type" },
    { key: "referenceNumber", label: "text-reference-number" },
    { key: "status", label: "text-status" },
    { key: "amount", label: "text-amount" },
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
        if (item.key === "status") {
          return (
            <PreviewItem
              key={item.key}
              label={t(item.label)}
              value={
                <Badge variant="flat" rounded="lg" color={getBadgeColorByStatus(data[item.key] as string)}>
                  {data[item.key] as string}
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
          title={t("text-payment-request")}
          subtitle={data?.paymentRequestNo || ""}
        />
        <BoxGroup
          title={t("text-payment-details")}
          className="pt-4 @2xl:pt-7 @3xl:pt-9"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <ul className="grid grid-cols-2 gap-y-3">
            {renderPreviewItems()}
          </ul>
        </BoxGroup>
      </BoxContainer>
    </Box>
  )
})

PaymentRequestInformation.displayName = "PaymentRequestInformation"

export default PaymentRequestInformation

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}
