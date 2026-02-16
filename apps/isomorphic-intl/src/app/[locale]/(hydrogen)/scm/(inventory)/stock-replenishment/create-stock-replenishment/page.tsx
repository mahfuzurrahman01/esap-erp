import { metaObject } from "@/config/site.config"
import StockReplenishmentCreatePage from "@/modules/scm/components/templates/inventory/stock-replanishment/stock-replanishment-create"

export const metadata = {
  ...metaObject("Stock Replenishment Create"),
}

export default function page() {
  return (
    <div>
      <StockReplenishmentCreatePage />
    </div>
  )
}
