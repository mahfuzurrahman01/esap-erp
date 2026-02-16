import { metaObject } from "@/config/site.config"
import PurchasedOrderDetailsPage from "@/modules/scm/components/templates/procurement/purchased-order/purchased-order-view"

export const metadata = {
  ...metaObject("Purchased Order Details"),
}

export default function page() {
  return (
    <>
      <PurchasedOrderDetailsPage />
    </>
  )
}
