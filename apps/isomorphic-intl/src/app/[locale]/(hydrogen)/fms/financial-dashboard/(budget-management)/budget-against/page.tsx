import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BudgetAgainstList from "@/modules/fms/components/templates/budget-against"

export const metadata = {
  ...metaObject("Budget Against List"),
}

const pageHeader = {
  title: "text-budget-against",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-budget-against",
    },
  ],
}

export default function BudgetAgainstPage() {
  return (
    <>
      <BudgetAgainstList pageHeader={pageHeader} />
    </>
  )
}
