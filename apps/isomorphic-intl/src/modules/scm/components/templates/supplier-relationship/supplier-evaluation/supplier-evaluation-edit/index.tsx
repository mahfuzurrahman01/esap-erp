"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SupplierEvaluationCreateEdit from "@/modules/scm/components/containers/supplier-relationship/supplier-evalutaion/create-supplier-evaluation"
import { useSupplierEvaluationById } from "@/modules/scm/hooks/supplier-relationship/supplier-evaluation/use-supplier-evaluation"
import { SupplierEvaluation } from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-supplier-evaluation-edit",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-evaluation-history",
      href: routes.scm.supplierRelationship.evaluationHistory.evaluationHistory,
    },
    {
      name: "text-supplier-evaluation-edit",
    },
  ],
}

export default function SupplierEvaluationEditPage() {
  const params = useParams()

  const { data, isLoading } = useSupplierEvaluationById(Number(params?.id)) as {
    data: SupplierEvaluation | undefined
    isLoading: boolean
  }

  if (isLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupplierEvaluationCreateEdit initialData={data} isEditForm={true} />
    </>
  )
}
