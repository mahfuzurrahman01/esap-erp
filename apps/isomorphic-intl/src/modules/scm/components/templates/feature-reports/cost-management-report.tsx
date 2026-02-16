"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import CostManagementReportList from "@/modules/scm/components/containers/feature-reports/cost-management-report"
import { useCostManagementReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-cost-management-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-cost-management-report",
    },
  ],
}

export default function CostManagementReport() {
  const { data } = useCostManagementReport()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, product name, work center, quantity, material cost"
            }
            fileName={"cost-management-report"}
          />
        </div>
      </PageHeader>
      <CostManagementReportList />
    </>
  )
}
