"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import ComplianceTable from "@/modules/scm/components/containers/compliance-and-risk/compliance/compliance-list"

const pageHeader = {
  title: "text-compliance-list",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-compliance-list",
    },
  ],
}

export default function ComplianceListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.complianceAndRisk.compliance.createCompliance}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <ComplianceTable />
    </>
  )
}
