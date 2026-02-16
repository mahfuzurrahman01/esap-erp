import { metaObject } from "@/config/site.config"
import StockEntryPage from "@/modules/scm/components/templates/inventory/stock-overview/stock-entry"

export const metadata = {
  ...metaObject("Stock Entry"),
}

export default function page() {
  return (
    <div>
      <StockEntryPage />
    </div>
  )
}
