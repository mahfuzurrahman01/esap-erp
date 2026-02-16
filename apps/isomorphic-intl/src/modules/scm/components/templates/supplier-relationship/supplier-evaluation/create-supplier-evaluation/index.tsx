"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import SupplierEvaluationCreateEdit from "@/modules/scm/components/containers/supplier-relationship/supplier-evalutaion/create-supplier-evaluation"
import { useSupplierById } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-supplier-evaluation-create",
  breadcrumb: [
    {
      name: "text-supplier-relationship",
    },
    {
      name: "text-evaluation-history",
      href: routes.scm.supplierRelationship.evaluationHistory.evaluationHistory,
    },
    {
      name: "text-supplier-evaluation-create",
    },
  ],
}

export default function SupplierEvaluationCreatePage() {
  const params = useParams()
  const { data: supplierData, isLoading: isSupplierLoading } = useSupplierById(
    Number(params?.id)
  )

  if (isSupplierLoading) return <PageLoading />

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <SupplierEvaluationCreateEdit
        initialData={supplierData}
        isEditForm={false}
      />
    </>
  )
}
