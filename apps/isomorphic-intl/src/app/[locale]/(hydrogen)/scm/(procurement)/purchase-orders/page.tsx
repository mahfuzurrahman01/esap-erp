import { metaObject } from "@/config/site.config"
import PurchasedOrderList from "@/modules/scm/components/templates/procurement/purchased-order/purchased-order-list"

export const metadata = {
  ...metaObject("Purchase Order List"),
}

function page() {
  return (
    <>
      <PurchasedOrderList />
    </>
  )
}

export default page
