"use client"

import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import RiskEvaluationTable from "@/modules/scm/components/containers/compliance-and-risk/risk-evaluation/risk-evaluation-list"

const pageHeader = {
  title: "text-risk-evaluation-list",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-risk-evaluation-list",
    },
  ],
}

export default function RiskEvaluationListPage() {
  const t = useTranslations("form")

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={
              routes.scm.complianceAndRisk.riskEvaluation.createRiskEvaluation
            }
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RiskEvaluationTable />
    </>
  )
}
