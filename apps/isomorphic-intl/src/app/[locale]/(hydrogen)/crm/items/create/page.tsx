import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ProductCreateTemplate from "@/modules/crm/components/templates/products/create"

export const metadata = {
  ...metaObject("Product Create"),
}

const pageHeader = {
  title: "text-create-product",
  breadcrumb: [
    {
      name: "text-product",
    },
    {
      href: routes.crm.items,
      name: "text-product-list",
    },
    {
      name: "text-create-product",
    },
  ],
}

export default function ProductCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductCreateTemplate />
    </>
  )
}
