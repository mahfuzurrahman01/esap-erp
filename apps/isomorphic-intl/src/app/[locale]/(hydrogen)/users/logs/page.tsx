import { routes } from "@/config/routes"
import LogListTemplate from "@/modules/crm/components/templates/logs"

const pageHeader = {
  title: "text-activity-logs",
  breadcrumb: [
    {
      href: routes.crm.activityLog,
      name: "text-user-activity",
    },
    {
      name: "text-list",
    },
  ],
}

export default function LogListPage() {
  return (
    <LogListTemplate pageHeader={pageHeader} />
  )
}
