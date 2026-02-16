"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ComplianceForm from "@/modules/scm/components/containers/compliance-and-risk/compliance/create-compliance"

const pageHeader = {
  title: "text-compliance-create",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
      href: routes.scm.complianceAndRisk.compliance.compliance,
    },
    {
      name: "text-compliance-create",
    },
  ],
}

export default function ComplianceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ComplianceForm />
    </>
  )
}
