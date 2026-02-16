"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import OpportunityEditForm from "@/modules/crm/components/containers/opportunities/edit-form"
import { useOpportunityById } from "@/modules/crm/hooks/use-opportunities"

export default function OpportunityEditTemplate({ id }: { id: string }) {
  const { data, isLoading }: any = useOpportunityById(id)

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <OpportunityEditForm id={id} opportunityData={data} />
  )
}
