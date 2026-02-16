import { metaObject } from "@/config/site.config"
import InventoryShortageReport from "@/modules/scm/components/templates/feature-reports/inventory-shortage-report"


export const metadata = {
  ...metaObject("Inventory Item Shortage Report"),
}

export default function InventoryItemShortageReportPage() {
  return <InventoryShortageReport />
}
