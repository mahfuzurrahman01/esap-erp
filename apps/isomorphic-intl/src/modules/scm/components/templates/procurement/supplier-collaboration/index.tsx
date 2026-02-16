"use client"



import PageHeader from "@/components/base/page-header"
import SupplierCollaboration from "@/modules/scm/components/containers/procurement/supplier-collaboration"

const pageHeader = {
  title: "text-supplier-collaboration",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-collaboration",
    },
  ],
}

export default function SupplierCollaborationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupplierCollaboration />
    </>
  )
}
