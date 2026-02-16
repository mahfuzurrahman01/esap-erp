"use client";

import React from "react";
import { Text } from "rizzui";
import { useTranslations } from "next-intl";
import CountryCell from "../../quotation/country-cell";

export default function SalesInvoiceAddress({ salesInvoiceData }:any) {
  const t = useTranslations("crm") 
  return (
    <div className="py-8 font-semibold">
      <Text className="text-base font-medium text-black dark:text-gray-100">
        {t("text-address")}
      </Text>
      <br />
      <table className="w-full">
        <tbody>
          {[
            [
              { label: t("text-billing-contact-person"), value: salesInvoiceData?.billingContactPerson },
              { label: t("text-shipping-contact-person"), value: salesInvoiceData?.shippingContactPerson },
            ],
            [
              {
                label: t("text-billing-house"),
                value: salesInvoiceData?.billingHouse,
              },
              {
                label: t("text-shipping-house"),
                value: salesInvoiceData?.shippingHouse,
              },
            ],
            [
              { label: t("text-billing-street"), value: salesInvoiceData?.billingStreet },
              { label: t("text-shipping-street"), value: salesInvoiceData?.shippingStreet },
            ],
            [
              { label: t("text-billing-city"), value: salesInvoiceData?.billingCity },
              { label: t("text-shipping-city"), value: salesInvoiceData?.shippingCity },
            ],
            [
              {
                label: t("text-billing-state"),
                value: salesInvoiceData?.billingState,
              },
              {
                label: t("text-shipping-state"),
                value: salesInvoiceData?.shippingState,
              },
            ],
            [
              { label: t("text-billing-zip"), value: salesInvoiceData?.billingZip },
              { label: t("text-shipping-zip"), value: salesInvoiceData?.shippingZip },
            ],
            [
              {
                label: t("text-billing-country"),
                value: salesInvoiceData?.billingCountryId ? <CountryCell countryId={Number(salesInvoiceData.billingCountryId)} /> : "-",
              },
              {
                label: t("text-shipping-country"),
                value: salesInvoiceData?.shippingCountryId ? <CountryCell countryId={Number(salesInvoiceData.shippingCountryId)} /> : "-",
              },
            ],
          ].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, index) => (
                <React.Fragment key={index}>
                  <td className="py-2"><p className="font-medium text-[#919EAB]">{item.label}:</p></td>
                  <td className="py-2"><p className="font-medium text-black dark:text-gray-100">{item.value || "-"}</p></td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}