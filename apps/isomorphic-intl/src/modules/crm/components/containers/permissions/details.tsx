import React from "react"

import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { Permission } from "@/modules/crm/types/permission"

export default function PermissionDetailsView({
  dataById,
  onClose,
}: {
  dataById: Permission | undefined
  onClose: () => void
}) {
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-permission-details")}
        onClose={onClose}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("form-name"), value: dataById?.name },
                { label: t("form-module"), value: dataById?.module },
                { label: t("form-group"), value: dataById?.group },
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
