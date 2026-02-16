import { metaObject } from "@/config/site.config"
import StockDetailsPage from "@/modules/scm/components/templates/inventory/stock-overview/stock-view"

export const metadata = {
  ...metaObject("Stock Details"),
}

export default function page() {
  return (
    <>
      <StockDetailsPage />
    </>
  )
}
