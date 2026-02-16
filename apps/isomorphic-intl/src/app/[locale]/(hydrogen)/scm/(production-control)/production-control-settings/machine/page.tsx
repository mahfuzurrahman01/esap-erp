import { metaObject } from "@/config/site.config"
import Machine from "@/modules/scm/components/templates/production-control/production-control-settings/machine"

export const metadata = {
  ...metaObject("Machine"),
}

function page() {
  return <Machine />
}

export default page
