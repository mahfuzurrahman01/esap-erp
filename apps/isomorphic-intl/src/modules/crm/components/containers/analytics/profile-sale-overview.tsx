import { useProfileSaleOverview } from '@/modules/crm/hooks/use-dashboard-reports';
import React from 'react'
import SkeletonLoader from "@/components/base/skeleton-loader"
import AssignedToCell from '../user/assigned-to-cell';
import { useTranslations } from 'next-intl';

export default function ProfileSaleOverview() {
    const t = useTranslations("crm")
    const { data: output, isLoading }: any = useProfileSaleOverview() || {};
    const sale = output?.data || [];
    return (
      <div className="mt-5 rounded-bl-[16px] rounded-br-[16px] overflow-hidden rounded-tl-none rounded-tr-none">
          {isLoading ? (
            <SkeletonLoader row={1} />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="text-left p-6 text-sm font-medium text-title">
                    {t("text-deal-ownen")}
                    </th>
                    <th className="text-left p-6 text-sm font-medium text-title">
                    {t("text-sum-of-amount")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sale.map((row: any, index: number) => (
                    <tr
                      key={index}
                      className={`border-b border-dashed dark:border-gray-700 ${
                        index % 2 === 0 ? "bg-white dark:bg-gray-800" : "dark:bg-gray-800"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-title">
                        {row.dealOwner && (row.dealOwner.includes("@") || row?.dealOwner == "Unknown") ? (
                          <span className="font-medium text-gray-900 dark:text-gray-0">
                            {row.dealOwner}
                          </span>
                        ) : (
                          <AssignedToCell assignedTo={row.dealOwner} />
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-title">
                        {row?.sumOfAmount}
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
