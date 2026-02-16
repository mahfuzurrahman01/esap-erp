import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import QuotationDetailsTemplate from "@/modules/crm/components/templates/quotation/view"

export const metadata = {
  ...metaObject("View Quotation"),
}

const pageHeader = {
  title: "text-view-quotation",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.quotation,
      name: "text-quotation-list",
    },
    {
      name: "text-view-quotation",
    },
  ],
}

export default async function QuotationDetailsPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <QuotationDetailsTemplate pageHeader={pageHeader} id={params.id} />
  )
}
