import { metaObject } from "@/config/site.config"
import ComplianceViewPage from "@/modules/scm/components/templates/compliance-and-risk/compliance/compliance-view"

export const metadata = {
  ...metaObject("Compliance Details"),
}

export default function page() {
  return (
    <>
      <ComplianceViewPage />
    </>
  )
}
