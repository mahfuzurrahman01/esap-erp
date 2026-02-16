"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import WorkOrderTrackingList from "@/modules/scm/components/containers/production-control/work-order-tracking/work-order-tracking-list"

const pageHeader = {
  title: "text-work-order-tracking-list",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-work-order-tracking-list",
      href: routes.scm.productionControl.workOrderTracking.workOrderTracking,
    },
  ],
}

export default function WorkOrderTrackingListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <WorkOrderTrackingList />
    </>
  )
}
