import { metaObject } from "@/config/site.config"
import ComplianceEditPage from "@/modules/scm/components/templates/compliance-and-risk/compliance/compliance-edit"

export const metadata = {
  ...metaObject("Edit Compliance"),
}

export default function page() {
  return (
    <>
      <ComplianceEditPage />
    </>
  )
}
