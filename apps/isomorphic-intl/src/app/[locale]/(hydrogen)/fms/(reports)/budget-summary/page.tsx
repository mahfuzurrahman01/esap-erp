import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import BudgetSummaryTemplate from "@/modules/fms/components/templates/reports/budget-summary"

export const metadata = {
  ...metaObject("Budget Summary"),
}

const pageHeader = {
  title: "text-budget-summary",
}

export default function BudgetSummaryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <BudgetSummaryTemplate />
    </>
  )
}
