import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ProductListTemplate from "@/modules/crm/components/templates/products"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Item List"),
}

const pageHeader = {
  title: "text-item-list",
  breadcrumb: [
    {
      href: routes.crm.items,
      name: "text-items",
    },
    {
      name: "text-list",
    },
  ],
}
export default function ProductsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createProduct}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <ProductListTemplate />
      </div>
    </>
  )
}
