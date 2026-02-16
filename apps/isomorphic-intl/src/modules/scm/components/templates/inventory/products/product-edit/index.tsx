"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ProductEntry from "@/modules/scm/components/containers/invenory/products/product-entry"
import { useProductById } from "@/modules/scm/hooks/inventory/product/use-product"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-product-edit",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-products-list",
      href: routes.scm.inventory.products.products,
    },
    {
      name: "text-product-edit",
    },
  ],
}

export default function ProductEditPage() {
  const params = useParams()

  const { data, isLoading } = useProductById(Number(params?.id)) as {
    data: Product | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductEntry isEditForm={true} initialData={data} />
    </>
  )
}
