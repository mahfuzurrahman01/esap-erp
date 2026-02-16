"use client"

import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { paymentTermOptions } from "@/data/crm/quotation"

import { getApprovalStatusBadge } from "../approvals/status-badge"
import AttachmentSection from "./attachment"
import { ItemDetailsTable } from "./item-details-table"
import CountryCell from "./country-cell"
import { formatDate } from "@/utils/format-date"

function getPaymentTermLabel(value: string) {
  const option = paymentTermOptions.find((option) => option.value === value)
  return option ? option.label : "-"
}

export default function QuotationDetailsContainer({
  quotationData,
  printRef,
}: any) {
  const t = useTranslations("crm")

  return (
    <div className="card-shadow mx-auto mb-8 w-full max-w-[210mm]">
      <div
        ref={printRef}
        className="w-[210mm min-h-[297mm] divide-y divide-dashed divide-gray-500/20 p-6 shadow-sm dark:!text-gray-900"
        style={{ margin: "0 auto" }}>
        <div className="pb-8 font-semibold">
          <Text className="text-base font-medium text-black dark:text-gray-100">
            {t("text-information")}
          </Text>
          <br />
          <table className="w-full">
            <tbody>
              {[
                [
                  {
                    label: t("text-title"),
                    value: quotationData?.title,
                  },
                  {
                    label: t("text-quotation-no"),
                    value: quotationData?.quotationNo,
                  },
                ],
                [
                  {
                    label: t("text-quotation-type"),
                    value: quotationData?.type,
                  },
                  {
                    label: t("text-approval-status"),
                    value: getApprovalStatusBadge(
                      quotationData?.approvalStatus
                    ),
                  },
                ],
                [
                  {
                    label: t("text-courier"),
                    value: quotationData?.deliveryStatus,
                  },
                  {
                    label: t("text-expire-date"),
                    value: quotationData?.expiryDate ? formatDate(quotationData?.expiryDate, "DD/MM/YYYY") : "",
                  },
                ],
                [
                  {
                    label: t("text-customer"),
                    value: `${quotationData?.customer?.firstName} ${quotationData?.customer?.lastName}`,
                  },
                  {
                    label: t("text-email"),
                    value: quotationData?.customer?.email,
                  },
                ],
                [
                  {
                    label: t("text-phone"),
                    value: quotationData?.customer?.phone,
                  },
                  {
                    label: t("text-payment-terms"),
                    value: getPaymentTermLabel(quotationData?.paymentTerms),
                  },
                ],
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, index) => (
                    <React.Fragment key={index}>
                      <td className="py-2">
                        <p className="font-medium text-[#919EAB]">
                          {item.label}:
                        </p>
                      </td>
                      <td className="py-2">
                        <p className="font-medium text-black dark:text-gray-100">
                          {item.value || "-"}
                        </p>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-8 font-semibold">
          <Text className="text-base font-medium text-black dark:text-gray-100">
            {t("text-address")}
          </Text>
          <br />
          <table className="w-full">
            <tbody>
              {[
                [
                  {
                    label: t("text-billing-street"),
                    value: quotationData?.billingStreet,
                  },
                  {
                    label: t("text-shipping-street"),
                    value: quotationData?.shippingStreet,
                  },
                ],
                [
                  {
                    label: t("text-billing-house"),
                    value: quotationData?.billingHouse,
                  },
                  {
                    label: t("text-shipping-house"),
                    value: quotationData?.shippingHouse,
                  },
                ],
                [
                  {
                    label: t("text-billing-city"),
                    value: quotationData?.billingCity,
                  },
                  {
                    label: t("text-shipping-city"),
                    value: quotationData?.shippingCity,
                  },
                ],
                [
                  {
                    label: t("text-billing-state"),
                    value: quotationData?.billingState,
                  },
                  {
                    label: t("text-shipping-state"),
                    value: quotationData?.shippingState,
                  },
                ],
                [
                  {
                    label: t("text-billing-zip"),
                    value: quotationData?.billingZip,
                  },
                  {
                    label: t("text-shipping-zip"),
                    value: quotationData?.shippingZip,
                  },
                ],
                [
                  { 
                    label: t("text-billing-country"), 
                    value: quotationData?.billingCountryId ? 
                      <CountryCell countryId={quotationData.billingCountryId} /> : "-" 
                  },
                  { 
                    label: t("text-shipping-country"), 
                    value: quotationData?.shippingCountryId ? 
                      <CountryCell countryId={quotationData.shippingCountryId} /> : "-" 
                  },
                ],
              ].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, index) => (
                    <React.Fragment key={index}>
                      <td className="py-2">
                        <p className="font-medium text-[#919EAB]">
                          {item.label}:
                        </p>
                      </td>
                      <td className="py-2">
                        <p className="font-medium text-black dark:text-gray-100">
                          {item.value || "-"}
                        </p>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotationData?.filePath && (
          <AttachmentSection fileUrl={quotationData?.filePath} />
        )}

        {quotationData?.quotationDetails && (
          <ItemDetailsTable data={quotationData} />
        )}
      </div>
    </div>
  )
}
