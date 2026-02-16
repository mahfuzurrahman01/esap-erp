import { useTranslations } from "next-intl"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useMeetingById } from "@/modules/crm/hooks/use-meeting"
import { Meeting } from "@/modules/crm/types/meeting"
import dayjs from "dayjs"
import { formatDate } from "@/utils/format-date"

export default function MeetingDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: dataById, isLoading } = useMeetingById(id) as {
    data: Meeting | undefined
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
        heading={t("text-meeting-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-id"), value: dataById?.shortOrder },
                { label: t("text-title"), value: dataById?.title },
                { label: t("text-meeting-time"), value: dataById?.meetingTime ? formatDate(dataById?.meetingTime, "DD/MM/YYYY h:mm a") : "" },
                { label: t("text-related-to"), value: dataById?.relatedTo },
                {
                  label: t("text-participate-type"),
                  value: dataById?.participateType,
                },
                { label: t("text-location"), value: dataById?.location },
                { label: t("text-repeat-time"), value: dataById?.repeatTime ? formatDate(dataById?.repeatTime, "DD/MM/YYYY h:mm a") : "" },
                {
                  label: t("text-reminder"),
                  value: dataById?.reminder ? "Enabled" : "Disabled",
                },
                { label: t("text-description"), value: dataById?.description },
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
