"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import StockAnalyticsReportList from "@/modules/scm/components/containers/feature-reports/stock-analytics-report"
import { useStockAnalyticsReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-stock-analytics-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-stock-analytics-report",
    },
  ],
}

export default function StockAnalyticsReport() {
  const { data } = useStockAnalyticsReport()
  return (
    <>
       <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, product name, stock validation method, quantity"
            }
            fileName={"stock-analytics-report"}
          />
        </div>
      </PageHeader>
      <StockAnalyticsReportList />
    </>
  )
}
