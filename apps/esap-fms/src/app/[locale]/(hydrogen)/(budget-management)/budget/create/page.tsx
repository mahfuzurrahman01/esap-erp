import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBudget from "@/modules/fms/components/templates/budget/create-budget"

export const metadata = {
  ...metaObject("Create Budget"),
}

const pageHeader = {
  title: "text-create-budget",
  breadcrumb: [
    {
      href: routes.fms.budget,
      name: "text-home",
    },
    {
      name: "text-create-budget",
    },
  ],
}

export default function CreateBudgetPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateBudget />
    </>
  )
}
