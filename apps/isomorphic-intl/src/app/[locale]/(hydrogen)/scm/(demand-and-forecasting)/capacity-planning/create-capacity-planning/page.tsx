import { metaObject } from "@/config/site.config"
import CreateCapacityPlanningPage from "@/modules/scm/components/templates/demand-and-forecasting/capacity-planning/create-capacity-planning"

export const metadata = {
  ...metaObject("Create Capacity Planning"),
}

export default function page() {
  return (
    <>
      <CreateCapacityPlanningPage />
    </>
  )
}
