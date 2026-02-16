import { routes } from "@/config/routes"
import StockListTemplate from "@/modules/crm/components/templates/stocks"

const pageHeader = {
  title: "text-stocks",
  breadcrumb: [
    {
      href: routes.crm.stocks,
      name: "text-stocks",
    },
    {
      name: "text-list",
    },
  ],
}

export default function StockListPage() {
  return (
    <div className="@container">
      <StockListTemplate pageHeader={pageHeader} />
    </div>
  )
}
