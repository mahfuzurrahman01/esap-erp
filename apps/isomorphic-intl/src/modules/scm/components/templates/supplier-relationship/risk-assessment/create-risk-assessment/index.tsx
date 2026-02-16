"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import RiskAssessmentCreateEdit from "@/modules/scm/components/containers/supplier-relationship/risk-assessment/create-risk-assessment"

const pageHeader = {
  title: "text-risk-assessment-create",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-risk-assessment",
      href: routes.scm.supplierRelationship.riskAssessment.riskAssessment,
    },
    {
      name: "text-risk-assessment-create",
    },
  ],
}

export default function RiskAssessmentCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RiskAssessmentCreateEdit />
    </>
  )
}
