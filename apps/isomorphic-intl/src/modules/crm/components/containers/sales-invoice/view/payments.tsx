"use client";

import { formatDate } from "@/utils/format-date";
import { useTranslations } from "next-intl";
import React from "react";
import { Text } from "rizzui";

export default function SalesInvoicePayment({ salesInvoiceData, getBankAccountLabel, getCostCenterLabel, getDebitToLabel, getPriceListLabel, getTaxChargeLabel, getTaxTemplateLabel, getPOLabel, getWarehouseLabel }:any) {
    const t = useTranslations("crm") 
    return (
    <div className="py-8 font-semibold">
      <Text className="text-base font-medium text-black dark:text-gray-100">
        {t("text-payment-details")}
      </Text>
      <br />
      <table className="w-full">
        <tbody>
          {[
            [
              { label: t("text-bank-account"), value: getBankAccountLabel(salesInvoiceData?.bankAccountId ?? "") },
              { label: t("text-cost-center"), value: getCostCenterLabel(salesInvoiceData?.costCenterId ?? "") },
            ],
            [
              { label: t("text-debit-to"), value: getDebitToLabel(salesInvoiceData?.debitToId ?? "") },
              { label: t("text-price-list"), value: getPriceListLabel(salesInvoiceData?.priceList ?? "") },
            ],
            [
              { label: t("text-tax-category"), value: getTaxChargeLabel(salesInvoiceData?.taxCategoryId ?? "") },
              { label: t("text-tax-template"), value: getTaxTemplateLabel(salesInvoiceData?.taxTemplateId ?? "") },
            ],
            [
              { label: t("text-customer-po"), value: getPOLabel(salesInvoiceData?.customersPO ?? "") },
              { label: t("text-customer-po-date"), value: salesInvoiceData?.customerPODate ? formatDate(salesInvoiceData?.customerPODate, "DD/MM/YYYY") : "" },
            ],
            [
              { label: t("text-warehouse"), value: getWarehouseLabel(salesInvoiceData?.warehouseId ?? "") },
              { label: t("text-description"), value: salesInvoiceData?.description },
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