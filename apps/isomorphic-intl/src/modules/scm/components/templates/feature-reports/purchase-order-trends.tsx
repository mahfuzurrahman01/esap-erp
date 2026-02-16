"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import PurchaseOrderTrendsReportList from "@/modules/scm/components/containers/feature-reports/purchase-order-trends"
import { usePurchaseOrderTrendsReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-purchase-order-trends",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-purchase-order-trends",
    },
  ],
}

export default function PurchaseOrderTrendsReport() {
  const { data } = usePurchaseOrderTrendsReport()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, product name, total quantity, total amount"
            }
            fileName={"purchase-order-trends"}
          />
        </div>
      </PageHeader>
      <PurchaseOrderTrendsReportList />
    </>
  )
}
