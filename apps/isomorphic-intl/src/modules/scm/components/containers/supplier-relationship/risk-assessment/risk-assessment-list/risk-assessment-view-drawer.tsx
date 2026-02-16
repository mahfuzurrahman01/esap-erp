"use client"

import { useMemo, useState } from "react"

import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useRiskAssessmentById } from "@/modules/scm/hooks/supplier-relationship/risk-assessment/use-risk-assessment"
import { RiskAssessment } from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"
import { processDescription } from "@/modules/scm/utils/html-to-covert"

export default function RiskAssessmentViewDrawer({
  initialData,
}: {
  initialData: RiskAssessment
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showMitigationPlan, setShowMitigationPlan] = useState(false)

  // Call useStockById directly in the component
  const { data, isLoading } = useRiskAssessmentById(Number(initialData?.id))

  // Use useMemo to memoize any derived data if needed
  const memoizedData: RiskAssessment | undefined = useMemo(
    () => data as RiskAssessment,
    [data]
  )

  if (isLoading) return <Loader />

  const rawDescription = memoizedData?.riskDescription || ""
  const displayedDescription = processDescription(
    rawDescription,
    showFullDescription
  )

  const rawMitigationPlan = memoizedData?.mitigationPlan || ""
  const displayedMitigationPlan = processDescription(
    rawMitigationPlan,
    showMitigationPlan
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-risk-assessment-details")}
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
                    {t("text-supplier-name")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.supplierName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-risk-type")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.riskType}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-risk-status")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.riskStatus}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-mitigation-plan")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {displayedMitigationPlan}
                  </Text>
                  {rawMitigationPlan.length > 200 && (
                    <button
                      onClick={() => setShowMitigationPlan(!showMitigationPlan)}
                      className="text-blue-500 hover:underline">
                      {showMitigationPlan
                        ? t("text-show-less")
                        : t("text-show-more")}
                    </button>
                  )}
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-risk-description")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {displayedDescription}
                  </Text>
                  {displayedDescription.length > 200 && (
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
