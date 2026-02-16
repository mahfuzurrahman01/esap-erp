import React from "react"

import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { Role } from "@/modules/crm/types/role"

export default function RoleDetailsView({
  dataById,
  onClose,
}: {
  dataById: Role | undefined
  onClose: () => void
}) {
  const t = useTranslations("form")

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("form-role-details")}
        onClose={onClose}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("form-role"), value: dataById?.roleName },
                {
                  label: t("form-permissions"),
                  value: dataById?.permissions,
                },
                { label: t("form-created-by"), value: dataById?.createdBy },
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
