"use client"

import UserEditForm from "@/components/container/user/edit-form"

export default function UserEditComponent({
  id,
  mode,
}: {
  id: string
  mode: "edit" | "create"
}) {
  return <UserEditForm id={id} mode={mode} />
}
