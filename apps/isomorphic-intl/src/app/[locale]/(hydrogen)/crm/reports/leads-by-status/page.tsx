import { routes } from "@/config/routes"
import LeadsByStatusTemplate from "@/modules/crm/components/templates/reports/leads/leads-by-status"

const pageHeader = {
  title: "text-leads-by-status",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-reports",
    },
    {
      name: "text-leads-report",
    },
  ],
}

export default function LeadsReportPage() {
  return (
    <LeadsByStatusTemplate pageHeader={pageHeader} />
  )
}
