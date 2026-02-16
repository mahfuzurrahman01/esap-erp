import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBudgetTemplate from "@/modules/fms/components/templates/budget-template/create-budget-template"

export const metadata = {
  ...metaObject("Create Budget Distribution"),
}

const pageHeader = {
  title: "text-create-budget-distribution",
  breadcrumb: [
    {
      href: routes.fms.budgetDistribution,
      name: "text-budget-distribution",
    },
    {
      name: "text-create-budget-distribution",
    },
  ],
}

export default function CreateBudgetDistributionPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateBudgetTemplate />
    </>
  )
}
