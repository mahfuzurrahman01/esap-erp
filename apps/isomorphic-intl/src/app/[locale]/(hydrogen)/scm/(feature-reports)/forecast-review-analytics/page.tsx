import { metaObject } from "@/config/site.config"
import ForecastReviewAnalytics from "@/modules/scm/components/templates/feature-reports/forecast-review-analytics"


export const metadata = {
  ...metaObject("Forecast Review Analytics"),
}

export default function ForecastReviewAnalyticsPage() {
  return <ForecastReviewAnalytics />
}
