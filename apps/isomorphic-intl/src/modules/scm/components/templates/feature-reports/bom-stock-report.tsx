"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"

import BomStockReportsList from "@/modules/scm/components/containers/feature-reports/bom-stock-reports"
import { useBomStock } from "@/modules/scm/hooks"


const pageHeader = {
  title: "text-bom-stock-reports",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-bom-stock-reports",
    },
  ],
}

export default function BomStockReportPage() {
  const { data } = useBomStock()

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, product name, unit name, quantity, unit cost, total cost"
            }
            fileName={"bom-stock-report"}
          />
        </div>
      </PageHeader>
      <BomStockReportsList />
    </>
  )
}
