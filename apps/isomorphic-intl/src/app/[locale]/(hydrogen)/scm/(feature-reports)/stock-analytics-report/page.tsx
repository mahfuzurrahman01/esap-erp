import { metaObject } from "@/config/site.config"
import StockAnalyticsReport from "@/modules/scm/components/templates/feature-reports/stock-analytics-report"


export const metadata = {
  ...metaObject("Stock Analytics Report"),
}

export default function StockAnalyticsReportPage() {
  return <StockAnalyticsReport />
}
