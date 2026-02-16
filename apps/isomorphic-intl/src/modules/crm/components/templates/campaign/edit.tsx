"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import CampaignEditForm from "@/modules/crm/components/containers/campaign/edit-form"
import { useCampaignById } from "@/modules/crm/hooks/use-campaign"
import { Campaign } from "@/modules/crm/types/campaign"

export default function CampaignEditTemplate({ id }: { id: string }) {
  const { data: campaignData, isLoading } = useCampaignById(id) as {
    data: Campaign | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <CampaignEditForm id={id} campaignData={campaignData} />
  )
}
