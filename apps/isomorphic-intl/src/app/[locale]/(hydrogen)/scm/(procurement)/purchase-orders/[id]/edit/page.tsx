import { metaObject } from "@/config/site.config"
import EditPurchasedOrderPage from "@/modules/scm/components/templates/procurement/purchased-order/purchased-order-edit"

export const metadata = {
  ...metaObject("Edit Purchase Order"),
}

export default function page() {
  return <EditPurchasedOrderPage />
}
