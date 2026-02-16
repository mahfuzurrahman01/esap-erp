"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import RequisitionTable from "@/modules/scm/components/containers/procurement/requisition/requisition-list"

const pageHeader = {
  title: "text-requisition-list",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-requisition-list",
    },
  ],
}

export default function RequisitionListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.procurement.requisitions.createRequisition}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RequisitionTable />
    </>
  )
}
