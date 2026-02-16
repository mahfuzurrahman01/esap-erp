import { metaObject } from "@/config/site.config"
import CreatePurchasedOrderPage from "@/modules/scm/components/templates/procurement/purchased-order/create-purchased-order"

export const metadata = {
  ...metaObject("Create Purchase Order"),
}

export default function page() {
  return (
    <>
      <CreatePurchasedOrderPage />
    </>
  )
}
