import React from "react"
import { useTranslations } from "next-intl"
import DrawerHeader from "@/components/base/drawer-header"
import { Target } from "@/modules/crm/types/target"
import SkeletonLoader from "@/components/base/skeleton-loader"
import dayjs from "dayjs"
import { useUserName } from "./retrieve-user-name"

export default function TargetDetailsView({
  dataById,
  onClose,
}: {
  dataById: Target | undefined
  onClose: () => void
}) {
  const t = useTranslations("crm")

  const { name: createdByName } = useUserName(dataById?.createdBy);

  if (!dataById) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-target-details")}
        onClose={onClose}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                { label: t("text-title"), value: dataById?.title },
                { label: t("text-type"), value: dataById?.type },
                { label: t("text-target-value"), value: dataById?.targetValue },
                { label: t("text-quarter"), value: dataById?.quarter },
                { label: t("text-month"), value: dataById.month && dayjs(dataById.month).format("MM/YYYY") },
                { label: t("text-status"), value: dataById?.status },
                { label: t("text-created-by"), value: createdByName },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-dotted border-gray-500/20">
                  <td className="font-base w-1/3 py-4 pr-4 text-gray-500 dark:text-gray-400">
                    {item.label}
                  </td>
                  <td className="py-4 font-semibold text-gray-900 dark:text-gray-0">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
