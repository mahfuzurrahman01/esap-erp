import { metaObject } from "@/config/site.config"
import CapacityPlanningListPage from "@/modules/scm/components/templates/demand-and-forecasting/capacity-planning/capacity-planning-list"

export const metadata = {
  ...metaObject("Capacity Planning"),
}

export default function page() {
  return (
    <>
      <CapacityPlanningListPage />
    </>
  )
}
