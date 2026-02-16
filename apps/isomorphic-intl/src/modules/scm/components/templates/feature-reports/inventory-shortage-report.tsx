"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import InventoryShortageReportList from "@/modules/scm/components/containers/feature-reports/inventory-shortage-report"
import { useInventoryShortageReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-inventory-shortage-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-inventory-shortage-report",
    },
  ],
}

export default function InventoryShortageReport() {
  const { data } = useInventoryShortageReport()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, warehouse, sku, product name, status, recorder quantity"
            }
            fileName={"inventory-shortage-report"}
          />
        </div>
      </PageHeader>
      <InventoryShortageReportList />
    </>
  )
}
