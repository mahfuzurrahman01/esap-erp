"use client"

import { useParams, useRouter } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import ComplianceView from "@/modules/scm/components/containers/compliance-and-risk/compliance/compliance-view"
import { useComplianceById } from "@/modules/scm/hooks/compliance-and-risk/compliance/use-compliance"
import { Compliance } from "@/modules/scm/types/compliance-and-risk/compliance-types"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"
import ComplianceForm from "@/modules/scm/components/containers/compliance-and-risk/compliance/create-compliance"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-compliance-details",
  breadcrumb: [
    {
      name: "text-compliance-and-risk",
    },
    {
      name: "text-compliance-list",
      href: routes.scm.complianceAndRisk.compliance.compliance,
    },
    {
      name: "text-compliance-details",
    },
  ],
}

export default function ComplianceViewPage() {
  const { id } = useParams()
  const router = useRouter()
  const t = useTranslations("common")
  const { data: compliance, isLoading } = useComplianceById(Number(id))
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.complianceAndRisk.compliance.editCompliance(
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
      <ComplianceForm initialData={compliance as Compliance} isViewForm />
    </>
  )
}
