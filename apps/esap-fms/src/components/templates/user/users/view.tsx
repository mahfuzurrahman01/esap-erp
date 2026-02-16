"use client"

import UserDetailsContainer from "@/components/container/user/view"

export default function UserDetailsTemplate({ id }: { id: string }) {
  return <UserDetailsContainer id={id} />
}
