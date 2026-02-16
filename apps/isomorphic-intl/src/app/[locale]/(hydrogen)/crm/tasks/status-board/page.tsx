import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import StatusBoardTemplate from "@/modules/crm/components/templates/tasks/status-board"

export const metadata = {
  ...metaObject("Task List"),
}

const pageHeader = {
  title: "text-status-board",
  breadcrumb: [
    {
      href: routes.crm.tasks,
      name: "text-tasks",
    },
    {
      name: "text-status-board",
    },
  ],
}

export default function TaskPage() {
  return (
    <>
      <div className="@container">
        <StatusBoardTemplate pageHeader={pageHeader} />
      </div>
    </>
  )
}
