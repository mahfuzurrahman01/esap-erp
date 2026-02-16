"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import { useMeetingById } from "@/modules/crm/hooks/use-meeting"
import { Meeting } from "@/modules/crm/types/meeting"

import MeetingEditForm from "@/modules/crm/components/containers/meeting/edit-form"

export default function MeetingEditTemplate({ id }: { id: string }) {
  const { data: meetingData, isLoading } = useMeetingById(id) as {
    data: Meeting | undefined
    isLoading: boolean
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <MeetingEditForm id={id} meetingData={meetingData} />
  )
}
