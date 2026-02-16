"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import LeadEditForm from "@/modules/crm/components/containers/lead/edit-form"
import { useLeadById } from "@/modules/crm/hooks/use-leads"
import { Lead } from "@/modules/crm/types/lead"

export default function LeadEditTemplate({ id }: { id: string }) {
  const { data: leadData, isLoading } = useLeadById(id) as {
    data: Lead | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <LeadEditForm id={id} leadData={leadData} />
  )
}
