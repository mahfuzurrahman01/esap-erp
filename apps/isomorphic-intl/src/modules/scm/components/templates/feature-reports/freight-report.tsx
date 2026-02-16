"use client"

import PageHeader from "@/components/base/page-header"
import ExportButton from "@/components/ui/export-button"
import FreightReportList from "@/modules/scm/components/containers/feature-reports/freight-report"
import { useFreightReport } from "@/modules/scm/hooks"

const pageHeader = {
  title: "text-freight-report",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-freight-report",
    },
  ],
}

export default function FreightReportPage() {
  const { data } = useFreightReport()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, origin, destination, cost"
            }
            fileName={"freight-report"}
          />
        </div>
      </PageHeader>
      <FreightReportList />
    </>
  )
}
