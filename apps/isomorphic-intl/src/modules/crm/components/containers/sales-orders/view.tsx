"use client"

import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"
import { useCompanyById } from "@/modules/fms/hooks/use-company"
import { useCurrencyById } from "@/modules/fms/hooks/use-currency"

import CountryCell from "../quotation/country-cell"
import { ItemDetailsTable } from "./item-details-table"
import { TaxTable } from "./tax-table"
import { formatDate } from "@/utils/format-date"

export default function SalesOrderDetailsContainer({
  salesOrderData,
  printRef,
}: any) {
  const t = useTranslations("crm")
  const { data: currencyData }: any = useCurrencyById(
    salesOrderData?.currencyId
  )
  const { data: companyData }: any = useCompanyById(salesOrderData?.companyId)

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
                  { label: t("text-title"), value: salesOrderData?.title },
                  {
                    label: t("text-order-no"),
                    value: salesOrderData?.salesOrderNo,
                  },
                ],
                [
                  { label: t("text-type"), value: salesOrderData?.type },
                  { label: t("text-company"), value: companyData?.companyName },
                ],
                [
                  {
                    label: t("text-status"),
                    value: salesOrderData?.approvalStatus,
                  },
                  {
                    label: t("text-posting-date"),
                    value: salesOrderData?.postingDate ? formatDate(salesOrderData?.postingDate, "DD/MM/YYYY") : ""
                  },
                ],
                [
                  {
                    label: t("text-customer"),
                    value: `${salesOrderData?.customer?.firstName || ""} ${salesOrderData?.customer?.lastName || ""}`,
                  },
                  {
                    label: t("text-delivery-date"),
                    value: salesOrderData?.delivaryDate ? formatDate(salesOrderData?.delivaryDate, "DD/MM/YYYY") : ""
                  },
                ],
                [
                  {
                    label: t("text-quotation-no"),
                    value: salesOrderData?.quotation?.quotationNo,
                  },
                  {
                    label: t("text-currency-id"),
                    value: currencyData?.currencyName,
                  },
                ],
                [
                  {
                    label: t("text-subtotal"),
                    value: salesOrderData?.subtotal,
                  },
                  { label: t("text-tax"), value: salesOrderData?.tax },
                ],
                [{ label: t("text-company"), value: companyData?.companyName }],
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
                          {item.value ?? "-"}
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
                    value: salesOrderData?.billingStreet,
                  },
                  {
                    label: t("text-shipping-street"),
                    value: salesOrderData?.shippingStreet,
                  },
                ],
                [
                  {
                    label: t("text-billing-house"),
                    value: salesOrderData?.billingHouse,
                  },
                  {
                    label: t("text-shipping-house"),
                    value: salesOrderData?.shippingHouse,
                  },
                ],
                [
                  {
                    label: t("text-billing-city"),
                    value: salesOrderData?.billingCity,
                  },
                  {
                    label: t("text-shipping-city"),
                    value: salesOrderData?.shippingCity,
                  },
                ],
                [
                  {
                    label: t("text-billing-state"),
                    value: salesOrderData?.billingState,
                  },
                  {
                    label: t("text-shipping-state"),
                    value: salesOrderData?.shippingState,
                  },
                ],
                [
                  {
                    label: t("text-billing-zip"),
                    value: salesOrderData?.billingZip,
                  },
                  {
                    label: t("text-shipping-zip"),
                    value: salesOrderData?.shippingZip,
                  },
                ],
                [
                  {
                    label: t("text-billing-country"),
                    value: salesOrderData?.billingCountryId ? (
                      <CountryCell
                        countryId={salesOrderData.billingCountryId}
                      />
                    ) : (
                      "-"
                    ),
                  },
                  {
                    label: t("text-shipping-country"),
                    value: salesOrderData?.shippingCountryId ? (
                      <CountryCell
                        countryId={salesOrderData.shippingCountryId}
                      />
                    ) : (
                      "-"
                    ),
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

        {salesOrderData?.salesOrderDetails && (
          <ItemDetailsTable data={salesOrderData} />
        )}

        {salesOrderData?.salesOrderVatTaxDetailsDTOs && (
          <TaxTable data={salesOrderData} />
        )}
      </div>
    </div>
  )
}
