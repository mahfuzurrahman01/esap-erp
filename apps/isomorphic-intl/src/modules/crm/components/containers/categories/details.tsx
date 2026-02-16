import React from "react"

import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { Category } from "@/modules/crm/types/category"

export default function CategoryDetailsView({
  dataById,
  onClose,
}: {
  dataById: Category | undefined
  onClose: () => void
}) {
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-category-details")}
        onClose={onClose}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-name"), value: dataById?.name },
                {
                  label: t("text-parent-category"),
                  value: dataById?.parentCategoryName,
                },
                { label: t("text-status"), value: dataById?.status },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="whitespace-nowrap border-b border-dotted border-gray-500/20">
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
