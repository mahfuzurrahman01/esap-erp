import { metaObject } from "@/config/site.config"
import StockReplenishmentListPage from "@/modules/scm/components/templates/inventory/stock-replanishment/stock-replanishment-list"

export const metadata = {
  ...metaObject("Stock Replenishment List"),
}

export default function page() {
  return (
    <>
      <StockReplenishmentListPage />
    </>
  )
}
