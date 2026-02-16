import { useThreeMonthsLead } from "@/modules/crm/hooks/use-dashboard-reports";
import { useTranslations } from "next-intl";
import React from "react";
import SkeletonLoader from "@/components/base/skeleton-loader"

export default function ThreeMonthLeads() {
  const t = useTranslations("crm")
  const { data: output, isLoading }: any = useThreeMonthsLead() || {};
  const tableData = output?.data || [];
  return (
    <div className="mt-5 rounded-lg">
      {isLoading ? (
        <SkeletonLoader row={1} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-month")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-leads-created")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-deals-created")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-deals-won")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-revenue-won")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                  {t("text-open-amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b border-dashed dark:border-gray-700 ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "dark:bg-gray-800"
                  }`}
                >
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    {row?.month} {row?.year}
                  </td>
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    {row?.leadsCreated}
                  </td>
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    {row?.dealsCreated}
                  </td>
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    {row?.dealsWon}
                  </td>
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    ${row?.revenueWon.toLocaleString()}
                  </td>
                  <td className="p-6 text-sm text-title whitespace-nowrap">
                    ${row?.openAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}