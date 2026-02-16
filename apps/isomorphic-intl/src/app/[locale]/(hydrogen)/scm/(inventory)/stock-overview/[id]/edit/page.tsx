import { metaObject } from "@/config/site.config"
import StockEditPage from "@/modules/scm/components/templates/inventory/stock-overview/stock-edit"

export const metadata = {
  ...metaObject("Stock Edit"),
}

export default function page() {
  return (
    <>
      <StockEditPage />
    </>
  )
}
