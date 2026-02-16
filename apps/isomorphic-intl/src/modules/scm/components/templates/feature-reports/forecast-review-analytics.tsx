"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import ForecastReviewAnalyticsList from "@/modules/scm/components/containers/feature-reports/forecast-review-analytics"
import { useForecastReviewAnalytics } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-forecast-review-analytics",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-forecast-review-analytics",
    },
  ],
}

export default function ForecastReviewAnalyticsPage() {
  const { data } = useForecastReviewAnalytics()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, sku, product name, forecast period, current sales data, planned sales target, demand variation percentage"
            }
            fileName={"forecast-review-analytics"}
          />
        </div>
      </PageHeader>
      <ForecastReviewAnalyticsList />
    </>
  )
}
