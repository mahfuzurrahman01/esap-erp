"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import PencilIcon from "@core/components/icons/pencil"
import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditRequisition from "@/modules/scm/components/containers/procurement/requisition/create-requisition"
import { useRequisitionById } from "@/modules/scm/hooks/procurement/requisition/use-requisition"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-requisition-details",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-requisition-list",
      href: routes.scm.procurement.requisitions.requisitions,
    },
    {
      name: "text-requisition-details",
    },
  ],
}

export default function RequisitionDetailsPage() {
  const router = useRouter()
  const t = useTranslations("common")
  const { id } = useParams()
  const { data: requisitionData } = useRequisitionById(Number(id))
  if (!requisitionData) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.procurement.requisitions.editRequisitions(
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
      <CreateEditRequisition
        id={Number(id)}
        mode="view"
        requestFor="requisition"
      />
    </>
  )
}
