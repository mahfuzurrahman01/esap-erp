import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { DownloadIcon } from "@/components/icons/crm/download"
import { useBillById } from "@/modules/crm/hooks/use-bill"
import { Bill } from "@/modules/crm/types/bill"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { formatDate } from "@/utils/format-date"

export default function BillDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: dataById, isLoading } = useBillById(id) as {
      data: Bill | undefined
      isLoading: boolean
    }

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-bill-details")}
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
                  label: t("text-customer"),
                  value: dataById?.customer?.firstName,
                },
                {
                  label: t("text-income-category"),
                  value: dataById?.incomeCategory,
                },
                {
                  label: t("text-issue-date"),
                  value: dataById?.issueDate ? formatDate(dataById?.issueDate, "DD/MM/YYYY") : "",
                },
                { label: t("text-type"), value: dataById?.type },
                { label: t("text-amount"), value: dataById?.amount },
                {
                  label: t("text-payment-method"),
                  value: dataById?.paymentMethod,
                },
                { label: t("text-type"), value: dataById?.type },
                {
                  label: t("text-attachment"),
                  value: dataById?.filePath ? (
                    <div className="flex items-center space-x-2">
                      <a
                        href={String(dataById?.filePath)}
                        download={String(dataById?.filePath).split("/").pop()}
                        className="text-gray-900 dark:text-gray-0"
                        title="Download Attachment"
                        rel="noopener noreferrer">
                        <p className="flex">
                          {String(dataById?.filePath).split("/").pop()}{" "}
                          <DownloadIcon className="ml-2 text-gray-900 dark:text-gray-0" />
                        </p>
                      </a>
                    </div>
                  ) : (
                    t("text-no-attachment")
                  ),
                },
                { label: t("text-note"), value: dataById?.note },
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
