import { metaObject } from "@/config/site.config"
import SalesOperationPlanEditPage from "@/modules/scm/components/templates/demand-and-forecasting/sales-operation-plan/sales-operation-plan-edit"

export const metadata = {
  ...metaObject("Sales Operations Plan Edit"),
}

export default function page() {
  return (
    <>
      <SalesOperationPlanEditPage />
    </>
  )
}
