"use client";

import PageHeader from "@/components/base/page-header";
import ExportButton from "@/components/ui/export-button";
import ProductionPlanningReportList from "@/modules/scm/components/containers/feature-reports/production-planning";
import { useProductionPlanning } from "@/modules/scm/hooks";





const pageHeader = {
  title: "text-production-planning",
  breadcrumb: [
    {
      name: "text-feature-reports",
    },
    {
      name: "text-production-planning",
    },
  ],
}

export default function ProductionPlanningReport() {
  const { data } = useProductionPlanning()
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={data?.data ?? []}
            header={
              "id, work center, employee, work progress, order quantity"
            }
            fileName={"production-planning"}
          />
        </div>
      </PageHeader>
      <ProductionPlanningReportList />
    </>
  )
}