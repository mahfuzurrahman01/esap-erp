"use client"

import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SendByEmail from "@/modules/scm/components/containers/procurement/requisition/send-by-email"

const pageHeader = {
  title: "text-send-to-email",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-requisition-list",
      href: routes.scm.procurement.requisitions.requisitions,
    },
    {
      name: "text-send-to-email",
    },
  ],
}

export default function SendByEmailPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <SendByEmail />
    </>
  )
}
