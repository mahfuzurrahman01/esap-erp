import { metaObject } from "@/config/site.config"
import SalesOperationPlanCreatePage from "@/modules/scm/components/templates/demand-and-forecasting/sales-operation-plan/create-sales-operation-plan"

export const metadata = {
  ...metaObject("Create Sales Operations Plan"),
}

export default function page() {
  return (
    <>
      <SalesOperationPlanCreatePage />
    </>
  )
}
