"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import RiskAssessmentList from "@/modules/scm/components/containers/supplier-relationship/risk-assessment/risk-assessment-list"

const pageHeader = {
  title: "text-risk-assessment",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-risk-assessment",
    },
  ],
}

export default function RiskAssessmentListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={
              routes.scm.supplierRelationship.riskAssessment
                .createRiskAssessment
            }
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RiskAssessmentList />
    </>
  )
}
