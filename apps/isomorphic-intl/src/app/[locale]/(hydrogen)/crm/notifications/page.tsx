import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import NotificationListTemplate from "@/modules/crm/components/templates/notifications"

export const metadata = {
  ...metaObject("Notification List"),
}

const pageHeader = {
  title: "text-notification-list",
  breadcrumb: [
    {
      href: routes.crm.notifications,
      name: "text-notification",
    },
    {
      name: "text-list",
    },
  ],
}

export default function NotificationPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <div className="h-full @container">
        <NotificationListTemplate />
      </div>
    </>
  )
}
