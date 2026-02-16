"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateWorkOrderTrackingForm from "@/modules/scm/components/containers/production-control/work-order-tracking/create-work-order-tracking"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-view-work-order-tracking",
  breadcrumb: [
    {
      name: "text-production-control",
    },
    {
      name: "text-work-order-tracking-list",
      href: routes.scm.productionControl.workOrderTracking.workOrderTracking,
    },
    {
      name: "text-view-work-order-tracking",
    },
  ],
}

export default function WorkOrderTrackingViewPage() {
  const { id } = useParams()
  const router = useRouter()
  const t = useTranslations("common")
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
            href={routes.scm.productionControl.workOrderTracking.editWorkOrderTracking(
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
      <CreateWorkOrderTrackingForm id={Number(id)} mode="view" />
    </>
  )
}
