"use client"

import PageHeader from "@/components/base/page-header"

const pageHeader = {
  title: "text-risk-assessment-view",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-risk-assessment-view",
    },
  ],
}

export default function RiskAssessmentViewPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  )
}
