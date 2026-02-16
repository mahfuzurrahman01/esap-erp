"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditMaterialAvailability from "@/modules/scm/components/containers/production-control/materials-availibility/create-materials-availibility"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-material-availability-view",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-material-availability-list",
      href: routes.scm.productionControl.materialAvailability
        .materialAvailability,
    },
    {
      name: "text-material-availability-view",
    },
  ],
}

export default function MaterialAvailabilityViewPage() {
  const { id } = useParams()
  const router = useRouter()
  const t = useTranslations("common")

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.productionControl.materialAvailability.editMaterialAvailability(
              Number(id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>
      <CreateEditMaterialAvailability id={Number(id)} mode="view" />
    </>
  )
}
