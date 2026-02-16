"use client"

import { useMemo } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useMaterialRequirementsPlanApprovalById } from "@/modules/scm/hooks/production-control/material-availibility/use-material-requirements-plan-approval"
import { MaterialRequirementsPlanApproval } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-plan-approval-types"

import { getApprovalStatusBadge } from "./status-option"

export default function MaterialRequirementPlanningApprovalDrawerView({
  initialData,
}: {
  initialData: MaterialRequirementsPlanApproval
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()

  // Call useStockById directly in the component
  const { data, isLoading } = useMaterialRequirementsPlanApprovalById(
    Number(initialData?.id)
  )

  // Use useMemo to memoize any derived data if needed
  const memoizedData: MaterialRequirementsPlanApproval | undefined = useMemo(
    () => data as MaterialRequirementsPlanApproval,
    [data]
  )

  if (isLoading) return <Loader />

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-mrp-approval-details")}
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
                    {t("text-material-requirement-plan-id")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.materialRequirementPlanId}`}
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
                    {dayjs(memoizedData?.approvedDate).isValid()
                      ? dayjs(memoizedData?.approvedDate).format("YYYY/MM/DD")
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
                    {`${memoizedData?.approvedNotes}`}
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
