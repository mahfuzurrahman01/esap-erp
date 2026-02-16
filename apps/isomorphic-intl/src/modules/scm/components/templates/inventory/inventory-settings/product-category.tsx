"use client"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import ProductCategoryTable from "@/modules/scm/components/containers/invenory/inventory-settings/product-category/product-category-table"
import { useTranslations } from "next-intl"
import ProductCategoryFormDrawerView from "@/modules/scm/components/containers/invenory/inventory-settings/product-category/product-category-drawer-form"
import { PiPlusBold } from "react-icons/pi"
import { messages } from "@/config/messages"

const pageHeader = {
  title: "text-product-category",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.inventory.settings.productCategory,
      name: "text-product-category",
    },
  ],
}

const ProductCategory = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <ProductCategoryFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <ProductCategoryTable />
    </div>
  )
}

export default ProductCategory
