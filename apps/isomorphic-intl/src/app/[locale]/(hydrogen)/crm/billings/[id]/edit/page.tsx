import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BillEditTemplate from "@/modules/crm/components/templates/bills/edit"

export const metadata = {
  ...metaObject("Bill Edit"),
}

const pageHeader = {
  title: "text-edit-bill",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.bills,
      name: "text-bill-list",
    },
    {
      name: "text-edit-bill",
    },
  ],
}

export default async function InvoiceBillEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <BillEditTemplate id={params.id} />
      </div>
    </>
  )
}
