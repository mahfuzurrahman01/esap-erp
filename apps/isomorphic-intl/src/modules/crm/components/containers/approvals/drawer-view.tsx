import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { typeLabels } from "@/data/crm/common-column"
import { useApprovalById } from "@/modules/crm/hooks/use-approval"

export default function ApprovalDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: dataById }: any = useApprovalById(id)

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-approval-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                {
                  label: t("text-reference-id"),
                  value: dataById?.referenceId,
                },
                {
                  label: t("text-reference-name"),
                  value: dataById?.referenceName,
                },
                { label: t("text-type"), value: typeLabels[dataById?.type] },
                { label: t("text-status"), value: dataById?.approvalStatus },
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
