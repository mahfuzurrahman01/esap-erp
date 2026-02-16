"use client"

import PageHeader from "@/components/base/page-header"
import DocumentationContainer from "@/modules/scm/components/containers/documents"

const pageHeader = {
  title: "text-documents",
  breadcrumb: [
    {
      name: "text-documents",
    },
  ],
}

export default function DocumentsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <DocumentationContainer />
    </>
  )
}