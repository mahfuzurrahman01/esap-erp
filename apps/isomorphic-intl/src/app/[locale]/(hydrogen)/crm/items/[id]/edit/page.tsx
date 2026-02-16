import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ProductEditTemplate from "@/modules/crm/components/templates/products/edit"

export const metadata = {
  ...metaObject("Item Edit"),
}

const pageHeader = {
  title: "text-edit-item",
  breadcrumb: [
    {
      name: "text-items",
    },
    {
      href: routes.crm.items,
      name: "text-item-list",
    },
    {
      name: "text-edit-item",
    },
  ],
}

export default async function ProductEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <ProductEditTemplate id={params.id} />
      </div>
    </>
  )
}
