import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TargetListTemplate from "@/modules/crm/components/templates/targets"

export const metadata = {
  ...metaObject("Target List"),
}

const pageHeader = {
  title: "text-target-list",
  breadcrumb: [
    {
      href: routes.crm.targets,
      name: "text-target",
    },
    {
      name: "text-list",
    },
  ],
}

export default function TargetPage() {
  return (
    <div className="@container">
      <TargetListTemplate pageHeader={pageHeader} />
    </div>
  )
}
