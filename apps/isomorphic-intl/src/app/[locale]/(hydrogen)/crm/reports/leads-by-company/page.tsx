import { routes } from "@/config/routes"
import LeadsByCompanyTemplate from "@/modules/crm/components/templates/reports/leads/leads-by-company"

const pageHeader = {
  title: "text-leads-by-company",
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

export default function LeadsByCompanyPage() {
  return (
    <LeadsByCompanyTemplate pageHeader={pageHeader} />
  )
}
