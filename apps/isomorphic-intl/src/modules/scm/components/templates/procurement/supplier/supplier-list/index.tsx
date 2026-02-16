"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import SupplierTable from "@/modules/scm/components/containers/procurement/supplier/supplier-list"

const pageHeader = {
  title: "text-supplier-list",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-supplier-list",
    },
  ],
}

export default function SupplierList() {
  const t = useTranslations("form")

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.procurement.suppliers.addNewSupplier}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <SupplierTable />
    </>
  )
}
