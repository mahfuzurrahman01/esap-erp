"use client"

import { useTranslations } from "next-intl"


import Box from "@/components/ui/box"
import { SupplierEvaluation } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import { processDescription } from "@/modules/scm/utils/html-to-covert"

import EvaluationViewTable from "./evaluation-table"
import { Input } from "@/components/ui"
import { Textarea } from "rizzui/textarea"

export default function SupplierEvaluationView({
  initialData,
}: {
  initialData: SupplierEvaluation
}) {
  const t = useTranslations("common")
  return (
    <Box>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 p-6">
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
          <div className="flex items-center justify-between">
            {/* <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-supplier-name")}
            </Text> */}
            <Input
              label={t("text-supplier-name")}
              value={initialData?.supplierName}
              readOnly
              className="w-full"
              disabled
          />
            {/* <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.supplierName}
            </Text> */}
          </div>
          <div className="flex items-center justify-between">
            {/* <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-overall-score")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.overallScore}
            </Text> */}
               <Input
              label={t("text-overall-score")}
              value={initialData?.overallScore}
              readOnly
              className="w-full"
              disabled
          />
          </div>
          <div className="flex items-center justify-between">
            {/* <Text className="font-base text-gray-500 dark:text-gray-400">
              {t("text-evaluation-date")}
            </Text>
            <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
              {initialData?.evaluationDate
                ? new Date(initialData.evaluationDate).toLocaleDateString(
                    "en-CA"
                  )
                : ""}
            </Text> */}
            <Input
            label={t("text-evaluation-date")}
            value={
              initialData?.evaluationDate
                ? new Date(initialData.evaluationDate).toLocaleDateString("en-CA")
                : ""
            }
            readOnly
            disabled
            className="w-full"
          />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3 w-full">
          <div className="flex items-center justify-between w-full">
            <Textarea
            labelClassName="text-title dark:text-title"
            textareaClassName="border-body/20 hover:border-title focus:border-2 focus:border-title ring-0 [&.is-focus]:ring-0"
            label={t("text-comments")}
            value={processDescription(initialData?.comments || "", false)}
            readOnly
            className="!w-full text-title dark:text-title"
          />
          </div>
        </div>
      </div>
      <EvaluationViewTable initialData={initialData} />
    </Box>
  )
}
