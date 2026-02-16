import { routes } from "@/config/routes"
import SalesReportListTemplate from "@/modules/crm/components/templates/reports/sales"

const pageHeader = {
  title: "text-monthly-sales-report",
  breadcrumb: [
    {
      href: routes.crm.slas,
      name: "text-reports",
    },
    {
      name: "text-sales-report",
    },
  ],
}

export default function SalesReportPage() {
  return (
    <SalesReportListTemplate pageHeader={pageHeader} />
  )
}
