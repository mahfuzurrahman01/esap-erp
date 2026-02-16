import { metaObject } from "@/config/site.config"
import StockTransferListPage from "@/modules/scm/components/templates/inventory/stock-transfer/stock-transfer-list"

export const metadata = {
  ...metaObject("Stock Transfer From List"),
}

export default function page() {
  return (
    <>
      <StockTransferListPage />
    </>
  )
}
