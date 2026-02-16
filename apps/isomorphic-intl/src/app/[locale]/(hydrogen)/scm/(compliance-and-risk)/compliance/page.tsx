import { metaObject } from "@/config/site.config"
import ComplianceListPage from "@/modules/scm/components/templates/compliance-and-risk/compliance/compliance-list"

export const metadata = {
  ...metaObject("Compliance"),
}

export default function page() {
  return (
    <>
      <ComplianceListPage />
    </>
  )
}
