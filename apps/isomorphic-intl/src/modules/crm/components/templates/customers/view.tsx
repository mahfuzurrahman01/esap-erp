"use client"

import CustomerDetailsContainer from "@/modules/crm/components/containers/customers/view"

export default function CustomerDetailsTemplate({ id }: { id: string }) {
  return <CustomerDetailsContainer id={id} />
}
