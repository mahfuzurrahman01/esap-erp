"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import TicketEditForm from "@/modules/crm/components/containers/tickets/edit-form"
import { useTicketById } from "@/modules/crm/hooks/use-ticket"
import { Ticket } from "@/modules/crm/types/ticket"

export default function TicketEditTemplate({ id }: { id: string }) {
  const { data: ticketData, isLoading } = useTicketById(id) as {
    data: Ticket | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <TicketEditForm id={id} ticketData={ticketData} />
  )
}
