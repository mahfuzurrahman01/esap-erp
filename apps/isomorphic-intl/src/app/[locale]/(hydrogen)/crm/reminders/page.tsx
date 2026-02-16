import { routes } from "@/config/routes"
import ReminderListTemplate from "@/modules/crm/components/templates/reminder"

const pageHeader = {
  title: "text-reminder",
  breadcrumb: [
    {
      href: routes.crm.reminders,
      name: "text-reminder",
    },
    {
      name: "text-list",
    },
  ],
}

export default function reminderListPage() {
  return (
    <div className="@container">
      <ReminderListTemplate pageHeader={pageHeader} />
    </div>
  )
}
