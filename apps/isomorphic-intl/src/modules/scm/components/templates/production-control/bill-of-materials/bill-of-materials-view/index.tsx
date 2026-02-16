"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditBillOfMaterials from "@/modules/scm/components/containers/production-control/bill-of-materials/create-bill-of-materials"
import { useBillOfMaterialsById } from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials"
import { BillOfMaterials } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"
import PageLoading from "@/modules/scm/components/base/page-loading"

const pageHeader = {
  title: "text-bill-of-materials-details",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-bill-of-materials-list",
      href: routes.scm.productionControl.billOfMaterials.billOfMaterials,
    },
    {
      name: "text-bill-of-materials-details",
    },
  ],
}

export default function BillOfMaterialsDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const t = useTranslations("common")

  const { data: billOfMaterialsData, isLoading } = useBillOfMaterialsById(
    Number(id)
  )
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <TranslatableButton
            href={routes.fms.printPayment(id)}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          /> */}
          <TranslatableButton
            href={routes.scm.productionControl.billOfMaterials.editBillOfMaterials(
              Number(id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button
            onClick={() => {
              router.back()
            }}>
            {t("text-cancel")}
          </Button>
        </div>
      </PageHeader>
      <>
        <CreateEditBillOfMaterials
          isViewForm={true}
          initialData={billOfMaterialsData as BillOfMaterials}
        />
      </>
    </>
  )
}
