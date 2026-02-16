import { metaObject } from "@/config/site.config"
import PurchaseAnalyticsReport from "@/modules/scm/components/templates/feature-reports/purchase-analytics"


export const metadata = {
  ...metaObject("Purchase Analytics"),
}

export default function PurchaseAnalyticsPage() {
  return <PurchaseAnalyticsReport />
}
