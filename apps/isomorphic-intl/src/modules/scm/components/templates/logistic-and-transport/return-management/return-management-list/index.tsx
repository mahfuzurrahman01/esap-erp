"use client"

import PageHeader from "@/components/base/page-header"
import ReturnManagementList from "@/modules/scm/components/containers/logistic-and-transport/return-management"

const pageHeader = {
  title: "text-return-process",
  breadcrumb: [
    {
      name: "text-logistic-and-transport",
    },
    {
      name: "text-return-process",
    },
  ],
}

export default function ReturnManagementListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ReturnManagementList />
    </>
  )
}
