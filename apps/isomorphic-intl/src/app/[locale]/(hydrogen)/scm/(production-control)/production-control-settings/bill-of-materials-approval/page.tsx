import { metaObject } from "@/config/site.config"
import BillOfMaterialsApproval from "@/modules/scm/components/templates/production-control/production-control-settings/bill-of-materials-approval"

export const metadata = {
  ...metaObject("Bill of Materials Approval"),
}


function page() {
  return (
    <>
      <BillOfMaterialsApproval />
    </>
  )
}

export default page
