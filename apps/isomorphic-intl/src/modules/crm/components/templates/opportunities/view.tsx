"use client"

import React from "react"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import SkeletonLoader from "@/components/base/skeleton-loader"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import { routes } from "@/config/routes"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { EmailIcon } from "@/components/icons/crm/email"
import { useOpportunityById } from "@/modules/crm/hooks/use-opportunities"
import EmailDrawer from "@/modules/crm/components/containers/lead/email-drawer"
import { Opportunity } from "@/modules/crm/types/opportunity"
import OpportinityDetailsContainer from "@/modules/crm/components/containers/opportunities/view"

export default function OpportunityDetailsTemplate({
  pageHeader,
  id,
}: {
  pageHeader: PageHeaderTypes
  id: string
}) {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data, isLoading } = useOpportunityById(id) as {
    data: Opportunity | undefined
    isLoading: boolean
    refetch: () => void
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
                view: <EmailDrawer to={data?.lead?.email} opportunityId={id} />,
                placement: "right",
                containerClassName: "max-w-[480px] dropdown-gr",
              })
            }>
            <EmailIcon className="me-1.5 h-4 w-4" />
            {t("form-send-email")}
          </Button>
          <TranslatableButton
            href={routes.crm.editOpportunity(id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      {isLoading ? (
          <div className="px-40"><SkeletonLoader /></div>
        ) : (
          <OpportinityDetailsContainer opportunityData={data} />
        )}
    </>
  )
}
