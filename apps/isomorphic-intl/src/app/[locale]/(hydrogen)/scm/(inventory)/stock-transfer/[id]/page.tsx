import { metaObject } from "@/config/site.config"
import StockTransferViewPage from "@/modules/scm/components/templates/inventory/stock-transfer/stock-transfer-view"

export const metadata = {
  ...metaObject("Stock Transfer From Detail"),
}

export default function page() {
  return (
    <>
      <StockTransferViewPage />
    </>
  )
}
