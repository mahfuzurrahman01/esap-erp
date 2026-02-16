import { metaObject } from "@/config/site.config"
import StockReplenishmentViewPage from "@/modules/scm/components/templates/inventory/stock-replanishment/stock-replanishment-view"

export const metadata = {
  ...metaObject("Stock Replenishment Details"),
}

export default function page() {
  return (
    <>
      <StockReplenishmentViewPage />
    </>
  )
}
