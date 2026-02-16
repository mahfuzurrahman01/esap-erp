import { routes } from "@/config/routes"
import OpportunityReportListTemplate from "@/modules/crm/components/templates/reports/opportunity"

const pageHeader = {
  title: "text-opportunity-report",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-reports",
    },
    {
      name: "text-opportunity-by-stage",
    },
  ],
}

export default function OpportunityReportPage() {
  return (
    <OpportunityReportListTemplate pageHeader={pageHeader} />
  )
}
