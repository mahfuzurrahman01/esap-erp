import { routes } from "@/config/routes"
import SlaListTemplate from "@/modules/crm/components/templates/slas"

const pageHeader = {
  title: "text-sla",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-sla",
    },
    {
      name: "text-list",
    },
  ],
}

export default function SlaListPage() {
  return (
    <SlaListTemplate pageHeader={pageHeader} />
  )
}
