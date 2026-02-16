import { routes } from "@/config/routes"
import CampaignsReportListTemplate from "@/modules/crm/components/templates/reports/campaigns"

const pageHeader = {
  title: "text-company-wise-campaigns-report",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-reports",
    },
    {
      name: "text-campaigns-report",
    },
  ],
}

export default function CampaignsReportPage() {
  return (
    <CampaignsReportListTemplate pageHeader={pageHeader} />
  )
}
