import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CustomerEditTemplate from "@/modules/crm/components/templates/customers/edit"

export const metadata = {
  ...metaObject("Customer Edit"),
}
const pageHeader = {
  title: "text-edit-customer",
  breadcrumb: [
    {
      name: "text-customer",
    },
    {
      href: routes.crm.customers,
      name: "text-customer-list",
    },
    {
      name: "text-edit-customer",
    },
  ],
}

export default async function CustomerEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <CustomerEditTemplate id={params.id} />
      </div>
    </>
  )
}
