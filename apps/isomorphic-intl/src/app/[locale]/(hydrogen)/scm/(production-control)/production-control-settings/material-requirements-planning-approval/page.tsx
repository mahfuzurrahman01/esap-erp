import { metaObject } from "@/config/site.config"
import MaterialRequirementPlanningApproval from "@/modules/scm/components/templates/production-control/production-control-settings/material-requirement-planning-approval"

export const metadata = {
  ...metaObject("Material Requirements Planning Approval"),
}

function page() {
  return <MaterialRequirementPlanningApproval />
}

export default page
