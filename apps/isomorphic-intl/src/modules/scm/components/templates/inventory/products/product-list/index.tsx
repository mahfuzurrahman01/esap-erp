"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import ProductTable from "@/modules/scm/components/containers/invenory/products/product-list"

const pageHeader = {
  title: "text-products-list",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-products-list",
    },
  ],
}

export default function ProductListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.inventory.products.createProduct}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <ProductTable />
    </>
  )
}
