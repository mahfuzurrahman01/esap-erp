"use client"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ProductEntry from "@/modules/scm/components/containers/invenory/products/product-entry"

const pageHeader = {
  title: "text-product-entry",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-products-list",
      href: routes.scm.inventory.products.products,
    },
    {
      name: "text-product-entry",
    },
  ],
}

export default function ProductEntryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductEntry isEditForm={false} />
    </>
  )
}
