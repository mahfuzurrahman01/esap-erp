import { metaObject } from "@/config/site.config"
import BomStockReportPage from "@/modules/scm/components/templates/feature-reports/bom-stock-report"


export const metadata = {
  ...metaObject("BOM Stock Reports"),
}

export default function BOMStockReportsPage() {
  return <BomStockReportPage />
}
