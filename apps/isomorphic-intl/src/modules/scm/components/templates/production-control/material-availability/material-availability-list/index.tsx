"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import MaterialAvailabilityList from "@/modules/scm/components/containers/production-control/materials-availibility/materials-availibility-list"

const pageHeader = {
  title: "text-material-availability-list",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-material-availability-list",
      href: routes.scm.productionControl.materialAvailability
        .materialAvailability,
    },
  ],
}

export default function MaterialAvailabilityListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <MaterialAvailabilityList />
    </>
  )
}
