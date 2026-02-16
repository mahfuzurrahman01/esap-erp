import { metaObject } from "@/config/site.config"
import StockOverViewPage from "@/modules/scm/components/templates/inventory/stock-overview/stock-list"

export const metadata = {
  ...metaObject("Stock List"),
}

export default function page() {
  return (
    <>
      <StockOverViewPage />
    </>
  )
}
