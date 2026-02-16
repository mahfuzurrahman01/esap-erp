import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import BudgetVarianceReportTemplate from "@/modules/fms/components/templates/reports/budget-variance/budget-variance-report-template"

export const metadata = {
  ...metaObject("Budget Variance Report"),
}

const pageHeader = {
  title: "text-budget-variance-report",
}

export default function BudgetVarianceReportPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <BudgetVarianceReportTemplate />
    </>
  )
}
