"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEmailMessage from "@/modules/scm/components/containers/procurement/supplier-collaboration/create-email-message"

const pageHeader = {
  title: "text-supplier-collaboration",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-collaboration",
      href: routes.scm.procurement.supplierCollaboration.supplierCollaboration,
    },
    {
      name: "text-create-email-message",
    },
  ],
}

export default function CreateEmailMessagePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEmailMessage />
    </>
  )
}
