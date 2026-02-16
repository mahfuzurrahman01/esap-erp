"use client"

import React from "react"
import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { useCampaignById } from "@/modules/crm/hooks/use-campaign"
import { Campaign } from "@/modules/crm/types/campaign"
import SkeletonLoader from "@/components/base/skeleton-loader"
import CampaignDetailsContainer from "@/modules/crm/components/containers/campaign/view"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import { routes } from "@/config/routes"
import PencilIcon from "@/components/icons/pencil"

export default function CampaignDetailsTemplate({
  pageHeader,
  id,
}: {
  pageHeader: PageHeaderTypes
  id: string
}) {
  const { data, isLoading } = useCampaignById(id) as {
    data: Campaign | undefined
    isLoading: boolean
    refetch: () => void
  }
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.editCampaign(id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      {isLoading ? (
          <div className="px-40"><SkeletonLoader /></div>
        ) : (
          <CampaignDetailsContainer campaignData={data} />
        )}
    </>
  )
}
