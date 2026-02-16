import React from "react"

import { useTopLeadSource } from "@/modules/crm/hooks/use-lead-analytics"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useTranslations } from "next-intl"

export default function TopLeadSource() {
  const t = useTranslations("crm")
  const { data: output, isLoading }: any = useTopLeadSource() || {}
  const topLeads = output?.data
  return (
    <div className="rounded-bl-[16px] rounded-br-[16px] overflow-hidden rounded-tl-none rounded-tr-none">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="text-left p-6 text-sm font-medium text-title">
                      {t("text-lead-source")}
                    </th>
                    <th className="text-left p-6 text-sm font-medium text-title">
                    {t("text-record-count")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topLeads.map((row: any, index: number) => (
                    <tr
                      key={index}
                      className={`border-b border-dashed dark:border-gray-700 ${
                        index % 2 === 0 ? "bg-white dark:bg-gray-800" : "dark:bg-gray-800"
                      }`}
                    >
                      <td className="p-6 text-sm text-title">
                        {row?.leadSource || "N/A"}
                      </td>
                      <td className="p-6 text-sm text-title">
                        {row?.recordCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  )
}
