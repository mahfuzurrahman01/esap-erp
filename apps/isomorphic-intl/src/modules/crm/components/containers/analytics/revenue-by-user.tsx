import { useTranslations } from "next-intl";
import React from "react";
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useRevenueByUser } from "@/modules/crm/hooks/use-opportunity-analytics";
import AssignedToCell from "../user/assigned-to-cell";

export default function RevenueByUser() {
  const { data: output, isLoading }: any = useRevenueByUser() || {};
  const t = useTranslations("crm");
  const tableData = output?.data || [];
  return (
    <div className="rounded-bl-[16px] rounded-br-[16px] overflow-hidden rounded-tl-none rounded-tr-none">
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
                    {row.dealOwner && row.dealOwner.includes("@") ? (
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