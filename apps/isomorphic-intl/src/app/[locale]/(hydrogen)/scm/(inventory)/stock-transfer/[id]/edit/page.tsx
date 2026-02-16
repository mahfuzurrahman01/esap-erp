import { metaObject } from "@/config/site.config"
import StockTransferEditPage from "@/modules/scm/components/templates/inventory/stock-transfer/stock-transfer-edit"

export const metadata = {
  ...metaObject("Stock Transfer From Edit"),
}

export default function page() {
  return (
    <>
      <StockTransferEditPage />
    </>
  )
}
