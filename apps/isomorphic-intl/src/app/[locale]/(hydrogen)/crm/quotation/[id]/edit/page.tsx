import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import QuotationEditTemplate from "@/modules/crm/components/templates/quotation/edit"

export const metadata = {
  ...metaObject("Quotation Edit"),
}

const pageHeader = {
  title: "text-edit-quotation",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.quotation,
      name: "text-quotation-list",
    },
    {
      name: "text-edit-quotation",
    },
  ],
}

export default async function QuotationEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <QuotationEditTemplate id={params.id} />
      </div>
    </>
  )
}
