"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"

import PurchaseAnalyticsReportList from "@/modules/scm/components/containers/feature-reports/purchase-analytics"
import { usePurchaseAnalytics } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-purchase-analytics",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-purchase-analytics",
    },
  ],
}

export default function PurchaseAnalyticsReport() {
  const { data } = usePurchaseAnalytics()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, supplier name, payment terms, order amount"
            }
            fileName={"purchase-analytics"}
          />
        </div>
      </PageHeader>
      <PurchaseAnalyticsReportList />
    </>
  )
}
