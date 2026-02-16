"use client"

import { useParams, useRouter } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { useRiskEvaluationById } from "@/modules/scm/hooks/compliance-and-risk/risk-evaluation/use-risk-evaluation"
import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"
import CreateRiskEvaluationForm from "@/modules/scm/components/containers/compliance-and-risk/risk-evaluation/create-risk-evaluation"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-risk-evaluation-details",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-risk-evaluation-list",
      href: routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation,
    },
    {
      name: "text-risk-evaluation-details",
    },
  ],
}

export default function RiskEvaluationDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const t = useTranslations("common")
  const { data: riskEvaluation, isLoading } = useRiskEvaluationById(Number(id))
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.complianceAndRisk.riskEvaluation.editRiskEvaluation(
              Number(id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button onClick={() => router.back()}>
            {t("text-back")}
          </Button>
        </div>
      </PageHeader>
      <CreateRiskEvaluationForm
        initialData={riskEvaluation as RiskEvaluation}
        isViewForm
      />
    </>
  )
}
