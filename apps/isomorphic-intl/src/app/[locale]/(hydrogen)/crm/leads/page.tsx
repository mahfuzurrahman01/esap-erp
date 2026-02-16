
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import LeadListTemplate from "@/modules/crm/components/templates/lead"

export const metadata = {
  ...metaObject("Lead List"),
}

const pageHeader = {
  title: "text-lead",
  breadcrumb: [
    {
      href: routes.crm.leads,
      name: "text-lead",
    },
    {
      name: "text-list",
    },
  ],
}

export default function LeadPage() {
  return (
    <LeadListTemplate pageHeader={pageHeader} />
  )
}
