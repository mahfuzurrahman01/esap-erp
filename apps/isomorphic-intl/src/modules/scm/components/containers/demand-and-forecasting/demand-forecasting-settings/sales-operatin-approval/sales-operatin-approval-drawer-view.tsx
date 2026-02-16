"use client"

import { useMemo } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useSalesOperationApprovalById } from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-approval"
import { SalesOperationApproval } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types"

import { getApprovalStatusBadge } from "./status-option"

export default function SalesOperationApprovalDrawerView({
  initialData,
}: {
  initialData: SalesOperationApproval
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()

  // Call useStockById directly in the component
  const { data, isLoading } = useSalesOperationApprovalById(
    Number(initialData?.id)
  )

  // Use useMemo to memoize any derived data if needed
  const memoizedData: SalesOperationApproval | undefined = useMemo(
    () => data as SalesOperationApproval,
    [data]
  )

  if (isLoading) return <Loader />

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-sales-operation-approval-details")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 px-8 py-4">
        <div className="flex space-x-4">
          <table className="w-full">
            <tbody>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-forecast-review-id")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.forecastReviewId}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-approved-by")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.approvedBy}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-approval-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {dayjs(memoizedData?.approvalDate).isValid()
                      ? dayjs(memoizedData?.approvalDate).format("YYYY/MM/DD")
                      : ""}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-approval-status")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {getApprovalStatusBadge(memoizedData?.approvalStatus ?? "")}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-created-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {dayjs(memoizedData?.createdDate).isValid()
                      ? dayjs(memoizedData?.createdDate).format("YYYY/MM/DD")
                      : ""}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-updated-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {dayjs(memoizedData?.updatedDate).isValid()
                      ? dayjs(memoizedData?.updatedDate).format("YYYY/MM/DD")
                      : ""}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-approval-notes")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.approvalNotes}`}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
