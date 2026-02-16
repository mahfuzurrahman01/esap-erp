"use client";

import React from "react";
import { Text } from "rizzui";
import { formatDate } from "@/utils/format-date";
import { useTranslations } from "next-intl";

export default function SalesInvoiceInformation({ salesInvoiceData, companyData, currencyData, getPaymentTermLabel }:any) {
  const t = useTranslations("crm")
  return (
    <div className="py-8 font-semibold">
      <Text className="text-base font-medium text-black dark:text-gray-100">
        {t("text-information")}
      </Text>
      <br />
      <table className="w-full">
        <tbody>
          {[
            [
              { label: t("text-invoice-no"), value: salesInvoiceData?.invoiceNo },
              { label: t("text-order-no"), value: salesInvoiceData?.salesOrder?.salesOrderNo },
            ],
            [
              { label: t("text-invoice-date"), value: formatDate(salesInvoiceData?.invoiceDate, "DD/MM/YYYY") },
              { label: t("text-due-date"), value: formatDate(salesInvoiceData?.dueDate, "DD/MM/YYYY") },
            ],
            [
              { label: t("text-customer"), value: `${salesInvoiceData?.customer?.firstName || ""} ${salesInvoiceData?.customer?.lastName || ""}` },
              { label: t("text-status"), value: salesInvoiceData?.status },
            ],
            [
              { label: t("text-company"), value: companyData?.companyName },
              { label: t("text-currency"), value: currencyData?.currencyName },
            ],
            [
              { label: t("text-payment-terms"), value: getPaymentTermLabel(salesInvoiceData?.paymentTerms ?? "") },
              { label: t("text-net-payable"), value: salesInvoiceData?.netPayable },
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