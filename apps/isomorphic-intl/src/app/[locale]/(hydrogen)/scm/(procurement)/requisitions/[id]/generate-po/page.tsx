import { metaObject } from "@/config/site.config"
import CreatePurchasedOrderPage from "@/modules/scm/components/templates/procurement/purchased-order/create-purchased-order"

export const metadata = {
  ...metaObject("Generate PO"),
}

export default function page() {
  return (
    <>
      <CreatePurchasedOrderPage />
    </>
  )
}
