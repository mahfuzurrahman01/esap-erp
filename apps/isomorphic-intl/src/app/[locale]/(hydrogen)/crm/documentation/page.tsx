import { routes } from "@/config/routes"
import DocumentationListTemplate from "@/modules/crm/components/templates/documentation"

const pageHeader = {
  title: "text-documentation",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-documentation",
    },
    {
      name: "text-list",
    },
  ],
}

export default function DocumentationListPage() {
  return (
    <DocumentationListTemplate pageHeader={pageHeader} />
  )
}
