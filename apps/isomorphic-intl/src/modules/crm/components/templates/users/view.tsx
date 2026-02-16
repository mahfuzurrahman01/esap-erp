"use client"

import UserDetailsContainer from "@/modules/crm/components/containers/user/view"

export default function UserDetailsTemplate({ id }: { id: string }) {
  return <UserDetailsContainer id={id} />
}
