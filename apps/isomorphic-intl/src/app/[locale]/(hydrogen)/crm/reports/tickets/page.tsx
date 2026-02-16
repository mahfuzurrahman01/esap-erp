import { routes } from "@/config/routes"
import TicketReportListTemplate from "@/modules/crm/components/templates/reports/tickets"

const pageHeader = {
  title: "text-monthly-support-report",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-reports",
    },
    {
      name: "text-ticket-report",
    },
  ],
}

export default function TicketReportPage() {
  return (
    <TicketReportListTemplate pageHeader={pageHeader} />
  )
}
