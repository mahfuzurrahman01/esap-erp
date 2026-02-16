import { metaObject } from "@/config/site.config"
import SCMDashboard from "@/modules/scm/components/templates/scm-dashboard"

export const metadata = {
  ...metaObject("SCM Dashboard"),
}

export default function SCMDashboardPage() {
  return <SCMDashboard />
}
