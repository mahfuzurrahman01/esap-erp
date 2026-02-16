"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import SupplierEvaluationView from "@/modules/scm/components/containers/supplier-relationship/supplier-evalutaion/supplier-evaluation-view"
import { useSupplierEvaluationById } from "@/modules/scm/hooks/supplier-relationship/supplier-evaluation/use-supplier-evaluation"
import { SupplierEvaluation } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import PageLoading from "@/modules/scm/components/base/page-loading"
import SupplierEvaluationCreateEdit from "@/modules/scm/components/containers/supplier-relationship/supplier-evalutaion/create-supplier-evaluation"

const pageHeader = {
  title: "text-supplier-evaluation-view",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-evaluation-history",
      href: routes.scm.inventory.warehouse.warehouse,
    },
    {
      name: "text-supplier-evaluation-view",
    },
  ],
}

export default function SupplierEvaluationViewPage() {
  const { id } = useParams()
  const { data: supplierEvaluation, isLoading } = useSupplierEvaluationById(
    Number(id)
  )
  const router = useRouter()
  const t = useTranslations("common")
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.supplierRelationship.evaluationHistory.editEvaluationHistory(
              Number(id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>
      <SupplierEvaluationCreateEdit
        initialData={supplierEvaluation as SupplierEvaluation}
        isViewForm={true}
      />
      {/* <SupplierEvaluationView
        initialData={supplierEvaluation as SupplierEvaluation}
      /> */}
    </>
  )
}
