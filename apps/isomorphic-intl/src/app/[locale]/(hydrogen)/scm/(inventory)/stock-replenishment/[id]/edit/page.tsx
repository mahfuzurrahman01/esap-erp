import { metaObject } from "@/config/site.config"
import StockReplenishmentEditPage from "@/modules/scm/components/templates/inventory/stock-replanishment/stock-replanishment-edit"

export const metadata = {
  ...metaObject("Stock Replenishment Edit"),
}

export default function page() {
  return (
    <>
      <StockReplenishmentEditPage />
    </>
  )
}
