import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { DownloadIcon } from "@/components/icons/crm/download"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useContactById } from "@/modules/crm/hooks/use-contact"
import { Contact } from "@/modules/crm/types/contact"
import dayjs from "dayjs"

export default function ContactDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: dataById, isLoading } = useContactById(id) as {
    data: Contact | undefined
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
        heading={t("text-contact-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0 px-8"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                { label: t("text-type"), value: dataById?.type },
                { label: t("text-subject"), value: dataById?.subject },
                { label: t("text-duration"), value: dataById?.duration },
                { label: t("text-contact-time"), value: dataById?.contactTime && dayjs(dataById?.contactTime).format("DD/MM/YYYY hh:mm a")},
                { label: t("text-related-to"), value: dataById?.relatedTo },
                { label: t("text-purpose"), value: dataById?.status },
                { label: t("text-description"), value: dataById?.description },
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
                }
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
