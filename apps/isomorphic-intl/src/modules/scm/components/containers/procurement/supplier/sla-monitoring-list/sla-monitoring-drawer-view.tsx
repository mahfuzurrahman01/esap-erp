"use client"

import { useMemo, useState } from "react"

import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useSLAMonitoringById } from "@/modules/scm/hooks/procurement/supplier/use-sla-monitoring"
import { ServiceLevelAgreementMonitoring } from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"

export default function SLAViewDrawer({
  initialData,
}: {
  initialData: ServiceLevelAgreementMonitoring
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Call useStockById directly in the component
  const { data, isLoading } = useSLAMonitoringById(Number(initialData?.id))

  // Use useMemo to memoize any derived data if needed
  const memoizedData: ServiceLevelAgreementMonitoring | undefined = useMemo(
    () => data as ServiceLevelAgreementMonitoring,
    [data]
  )

  if (isLoading) return <Loader />

  const rawDescription = memoizedData?.comments || ""
  const textWithoutHtml = rawDescription.replace(/<[^>]*>/g, "")
  const isLongDescription = textWithoutHtml.length > 200
  const displayedDescription =
    isLongDescription && !showFullDescription
      ? `${textWithoutHtml.substring(0, 200)}...`
      : textWithoutHtml

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-details")}
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
                    {t("text-audit-name")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.auditName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-audit-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.auditDate ? new Date(memoizedData.auditDate).toLocaleDateString("en-CA") : "-"}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-expected-performance")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.expectedPerformance}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-actual-performance")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.actualPerformance}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-audit-status")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.status}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-comments")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {displayedDescription}
                  </Text>
                  {isLongDescription && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-blue-500 hover:underline">
                      {showFullDescription
                        ? t("text-show-less")
                        : t("text-show-more")}
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
