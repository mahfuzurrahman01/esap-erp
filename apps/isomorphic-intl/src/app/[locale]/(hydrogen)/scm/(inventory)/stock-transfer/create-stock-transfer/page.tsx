import { metaObject } from "@/config/site.config"
import StockTransferCreatePage from "@/modules/scm/components/templates/inventory/stock-transfer/create-stock-transfer"

export const metadata = {
  ...metaObject("Stock Transfer From Create"),
}

export default function page() {
  return (
    <>
      <StockTransferCreatePage />
    </>
  )
}
