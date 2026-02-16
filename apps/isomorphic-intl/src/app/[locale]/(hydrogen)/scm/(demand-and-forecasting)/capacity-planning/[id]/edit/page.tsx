import { metaObject } from "@/config/site.config"
import CapacityPlanningEditPage from "@/modules/scm/components/templates/demand-and-forecasting/capacity-planning/capacity-planning-edit"

export const metadata = {
  ...metaObject("Capacity Planning Edit"),
}

export default function page() {
  return (
    <>
      <CapacityPlanningEditPage />
    </>
  )
}
