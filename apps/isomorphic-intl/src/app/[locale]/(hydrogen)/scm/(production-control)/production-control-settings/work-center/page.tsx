import { metaObject } from "@/config/site.config"
import WorkCenter from "@/modules/scm/components/templates/production-control/production-control-settings/work-center"

export const metadata = {
  ...metaObject("Work Center"),
}

function page() {
  return (
    <>
      <WorkCenter />
    </>
  )
}

export default page
