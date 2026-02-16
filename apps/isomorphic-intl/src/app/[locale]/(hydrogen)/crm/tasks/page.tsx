import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TaskListTemplate from "@/modules/crm/components/templates/tasks"

export const metadata = {
  ...metaObject("Task List"),
}

const pageHeader = {
  title: "text-task-list",
  breadcrumb: [
    {
      href: routes.crm.tasks,
      name: "text-tasks",
    },
    {
      name: "text-list",
    },
  ],
}

export default function TaskPage() {
  return <TaskListTemplate pageHeader={pageHeader} />
}
