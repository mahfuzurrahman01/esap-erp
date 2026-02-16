import { metaObject } from "@/config/site.config"
import ComplianceCreatePage from "@/modules/scm/components/templates/compliance-and-risk/compliance/create-compliance"

export const metadata = {
  ...metaObject("Create Compliance"),
}

export default function page() {
  return (
    <>
      <ComplianceCreatePage />
    </>
  )
}
