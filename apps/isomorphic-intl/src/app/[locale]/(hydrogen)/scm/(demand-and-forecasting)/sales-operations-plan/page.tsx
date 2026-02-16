import { metaObject } from "@/config/site.config"
import SalesOperationPlanListPage from "@/modules/scm/components/templates/demand-and-forecasting/sales-operation-plan/sales-operation-plan-list"

export const metadata = {
  ...metaObject("Sales Operations Plan"),
}

export default function page() {
  return (
    <>
      <SalesOperationPlanListPage />
    </>
  )
}
