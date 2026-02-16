import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { DownloadIcon } from "@/components/icons/crm/download"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useTicketById } from "@/modules/crm/hooks/use-ticket"
import { Ticket } from "@/modules/crm/types/ticket"
import { useCustomerById } from "@/modules/crm/hooks"
import { CustomerData } from "@/modules/crm/types/customer"

export default function TicketDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: dataById, isLoading } = useTicketById(id) as {
    data: Ticket | undefined
    isLoading: boolean
  }

  const { data: customerData } = useCustomerById(dataById?.departmentId) as {
    data: CustomerData | undefined
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
        heading={t("text-ticket-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                { label: t("text-subject"), value: dataById?.subject },
                { label: t("text-service"), value: dataById?.service },
                { label: t("text-project"), value: dataById?.project },
                { label: t("text-customer"), value: customerData?.firstName },
                { label: t("text-email"), value: dataById?.email },
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
                { label: t("text-status"), value: dataById?.status },
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
