"use client"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Box from "@/components/ui/box"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import { processDescription } from "@/modules/scm/utils/html-to-covert"

import {
  getMitigationStatusOptionsBadge,
  getResidualRiskOptionsBadge,
  getRiskImpactOptionsBadge,
  getRiskProbabilityOptionsBadge,
  getRiskStatusOptionsBadge,
} from "../risk-evaluation-list/status-badge"

export default function RiskEvaluationView({
  initialData,
}: {
  initialData: RiskEvaluation
}) {
  const t = useTranslations("common")
  return (
    <Box>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 p-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-risk-type")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.riskType}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-risk-impact")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {getRiskImpactOptionsBadge(initialData?.riskImpact || "")}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-risk-probability")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {getRiskProbabilityOptionsBadge(
                initialData?.riskProbability || ""
              )}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-residual-risk")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {getResidualRiskOptionsBadge(initialData?.residualRisk || "")}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-mitigation-deadline")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.mitigationDeadline
                ? dayjs(initialData.mitigationDeadline).isValid()
                  ? dayjs(initialData.mitigationDeadline).format("YYYY-MM-DD")
                  : "N/A"
                : "N/A"}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-mitigation-status")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.mitigationStatus
                ? getMitigationStatusOptionsBadge(initialData?.mitigationStatus)
                : "pending"}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-risk-status")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {getRiskStatusOptionsBadge(initialData?.riskStatus || "")}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-created-date")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.createdDate
                ? dayjs(initialData.createdDate).isValid()
                  ? dayjs(initialData.createdDate).format("YYYY-MM-DD")
                  : "N/A"
                : "N/A"}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-updated-date")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.updatedDate
                ? dayjs(initialData.updatedDate).isValid()
                  ? dayjs(initialData.updatedDate).format("YYYY-MM-DD")
                  : "N/A"
                : "N/A"}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-follow-up-action")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.followUpAction || "", false)}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-risk-description")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.riskDescription || "", false)}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-responsible-party")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.responsibleParty || "", false)}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-comments")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.comments || "", false)}
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-mitigation-action")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {processDescription(initialData?.mitigationAction || "", false)}
            </Text>
          </div>
        </div>
      </div>
    </Box>
  )
}
