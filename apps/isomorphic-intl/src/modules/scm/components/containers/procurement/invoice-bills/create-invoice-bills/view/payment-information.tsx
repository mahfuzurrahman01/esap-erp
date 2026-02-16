"use client";

import React from "react";



import dayjs from "dayjs";
import { useTranslations } from "next-intl";



import Box from "@/components/ui/box";
import BoxContainer from "@/components/ui/box-container";
import BoxGroup from "@/components/ui/box-group";
import PreviewHeader from "@/components/ui/preview/preview-header";
import { PreviewItem } from "@/components/ui/preview/preview-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types";



import { getBillingStatusBadge } from "../../invoice-bills-list/status-badge";
import { AdvancedPaymentsTable } from "../advanced-payments/advanced-payments-table";
import { ItemsListTable } from "../items-list/items-list-table";
import { PaymentTaxAndChargeTable } from "../payment-tax-and-charge/payment-tax-and-charge-table";





interface PreviewItemConfig {
  key: keyof Invoice
  label: string
  format?: (value: any) => string
  skip?: boolean
}

const PaymentInformation = React.forwardRef<HTMLDivElement, { data?: Invoice }>(
  ({ data }, ref) => {
    const t = useTranslations("common")

    const previewItems: PreviewItemConfig[] = [
      { key: "supplierName", label: "text-supplier-name" },
      { key: "projectName", label: "text-project-name" },
      {
        key: "invoiceDate",
        label: "text-invoice-date",
        format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
      },
      {
        key: "dueDate",
        label: "text-due-date",
        format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
      },
      {
        key: "expectedDeliveryDate",
        label: "text-expected-delivery-date",
        format: (value) => (value ? dayjs(value).format("DD-MM-YYYY") : "--"),
      },
      { key: "companyName", label: "text-company-name" },
      { key: "currencyName", label: "text-currency" },
      { key: "paymentStatus", label: "text-payment-status" },
      { key: "grandTotal", label: "text-grand-total" },
      { key: "netTotalAmount", label: "text-net-total-amount" },
      { key: "totalAdvance", label: "text-total-advance" },
      { key: "outstandingAmount", label: "text-outstanding-amount" },
      { key: "totalTax", label: "text-total-tax" },
      {
        key: "billingStatus",
        label: "text-billing-status",
        format: (value: any) => value || "",
        skip: true,
      },
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
          title={t("text-item-details")}
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
          title={t("text-payment-advance-payments")}
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
        .filter((item) => {
          const value = data?.[item.key]
          return !Array.isArray(value) && value != null && value !== ""
        })
        .map((item) => (
          <PreviewItem
            key={item.key}
            label={t(item.label)}
            value={
              item.format
                ? item.format(data[item.key])
                : (data[item.key] as string | number) || "--"
            }
          />
        ))
    }

    return (
      <Box
        className="print-content print:non-scrollable flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11"
        ref={ref}>
        <BoxContainer>
          <PreviewHeader
            title={t("text-purchase-invoice")}
            subtitle={data?.invoiceBillNo || ""}
          />
          <BoxGroup
            title={t("text-payment-details")}
            className="pt-4 @2xl:pt-7 @3xl:pt-9"
            childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
            <ul className="grid grid-cols-2 gap-y-3">{renderPreviewItems()}</ul>
          </BoxGroup>

          {(data?.invoiceItemDtos?.length ?? 0) > 0 && (
            <BoxGroup
              title={t("text-item-details")}

              className="pt-4 @2xl:pt-7 @3xl:pt-9"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
              <ItemsListTable
                data={data.invoiceItemDtos}
                isFieldDisabled
              />

            </BoxGroup>
          )}

          {(data?.invoiceVatTaxDetails?.length ?? 0) > 0 && (
            <BoxGroup
              title={t("text-payment-tax-and-charge")}

              className="pt-4 @2xl:pt-7 @3xl:pt-9"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
              <PaymentTaxAndChargeTable
                data={data.invoiceVatTaxDetails}
                isFieldDisabled

              />
            </BoxGroup>
          )}
          {(data?.invoiceAdvancePayments?.length ?? 0) > 0 && (
            <BoxGroup

              title={t("text-payment-advance-payments")}


              className="pt-4 @2xl:pt-7 @3xl:pt-9"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
              <AdvancedPaymentsTable
                data={data.invoiceAdvancePayments}
                isFieldDisabled


              />
            </BoxGroup>
          )}
        </BoxContainer>
      </Box>
    )
  }
)

PaymentInformation.displayName = "PaymentInformation"

export default PaymentInformation