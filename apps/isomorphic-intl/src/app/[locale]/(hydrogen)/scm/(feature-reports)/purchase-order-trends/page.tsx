import { metaObject } from "@/config/site.config"
import PurchaseOrderTrendsReport from "@/modules/scm/components/templates/feature-reports/purchase-order-trends"


export const metadata = {
  ...metaObject("Purchase Order Trends"),
}

export default function PurchaseOrderTrendsPage() {
  return <PurchaseOrderTrendsReport />
}
