"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import SLAMonitoringList from "@/modules/scm/components/containers/procurement/supplier/sla-monitoring-list"

const pageHeader = {
  title: "text-contract-sla-monitoring",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-contract-sla-monitoring",
    },
  ],
}

export default function SLAMonitoringListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SLAMonitoringList />
    </>
  )
}
