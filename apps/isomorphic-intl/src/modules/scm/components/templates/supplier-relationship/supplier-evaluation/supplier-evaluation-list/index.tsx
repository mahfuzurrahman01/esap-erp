"use client"

import PageHeader from "@/components/base/page-header"
import SupplierEvaluationList from "@/modules/scm/components/containers/supplier-relationship/supplier-evalutaion/supplier-evaluation-list"

const pageHeader = {
  title: "text-evaluation-history",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-evaluation-history",
    },
  ],
}

export default function SupplierEvaluationListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupplierEvaluationList />
    </>
  )
}
