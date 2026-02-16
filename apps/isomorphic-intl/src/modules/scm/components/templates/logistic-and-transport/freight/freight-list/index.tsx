"use client"

import PageHeader from "@/components/base/page-header"
import FreightList from "@/modules/scm/components/containers/logistic-and-transport/freight/freight-list"

const pageHeader = {
  title: "text-freight-management",
  breadcrumb: [
    {
      name: "text-logistic-and-transport",
    },
    {
      name: "text-freight-management",
    },
  ],
}

export default function FreightListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FreightList />
    </>
  )
}
