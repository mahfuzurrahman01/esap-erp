"use client"

import React from "react"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useLeadById } from "@/modules/crm/hooks/use-leads"
import { Lead } from "@/modules/crm/types/lead"
import SkeletonLoader from "@/components/base/skeleton-loader"
import LeadDetailsContainer from "@/modules/crm/components/containers/lead/view"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import { routes } from "@/config/routes"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { EmailIcon } from "@/components/icons/crm/email"

const EmailDrawer = dynamic(
  () => import("@/modules/crm/components/containers/lead/email-drawer"),
  {
    ssr: false,
  }
)

export default function LeadDetailsTemplate({
  pageHeader,
  id,
}: {
  pageHeader: PageHeaderTypes
  id: string
}) {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data, isLoading } = useLeadById(id) as {
    data: Lead | undefined
    isLoading: boolean
  }
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            type="button"
            className="flex cursor-pointer items-center justify-center bg-transparent border-gray-500 text-gray-900 hover:bg-transparent"
            onClick={() =>
              openDrawer({
                view: <EmailDrawer to={data?.email} leadId={id} />,
                placement: "right",
                containerClassName: "max-w-[480px] dropdown-gr",
              })
            }>
            <EmailIcon className="me-1.5 h-4 w-4" />
            {t("form-send-email")}
          </Button>
          <TranslatableButton
            href={routes.crm.editLead(id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      {isLoading ? (
          <div className="px-40"><SkeletonLoader /></div>
        ) : (
          <LeadDetailsContainer leadData={data} />
        )}
    </>
  )
}
