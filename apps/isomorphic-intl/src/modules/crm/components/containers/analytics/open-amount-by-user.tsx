import React from "react";
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useAmountByUser } from "@/modules/crm/hooks/use-opportunity-analytics";
import AssignedToCell from "../user/assigned-to-cell";
import { useTranslations } from "next-intl";

export default function OpenAmountByUser() {
  const t = useTranslations("crm")
  const { data: output, isLoading }: any = useAmountByUser() || {};
  const tableData = output?.data || [];
  return (
    <div className="rounded-lg">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                {t("text-deal-owner")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                {t("text-sum-of-amount")}
                </th>
                <th className="text-left p-6 text-sm font-medium text-title whitespace-nowrap">
                {t("text-growth-percentage")}
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
                    {row.dealOwner && (row.dealOwner.includes("@") || row?.dealOwner == "Unknown") ? (
                      <span className="font-medium text-gray-900 dark:text-gray-0">
                        {row.dealOwner}
                      </span>
                    ) : (
                      <AssignedToCell assignedTo={row.dealOwner} />
                    )}
                  </td>
                  <td className="p-6 text-sm text-title">
                    {row?.sumOfAmount}
                  </td>
                  <td className="p-6 text-sm text-title">
                    {row?.growthPercentage}
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