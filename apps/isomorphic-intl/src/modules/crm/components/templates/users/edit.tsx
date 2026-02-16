"use client"

import UserEditForm from "@/modules/crm/components/containers/user/edit-form"

export default function UserEditComponent({
  id,
  mode,
}: {
  id: string
  mode: "edit" | "create"
}) {
  return <UserEditForm id={id} mode={mode} />
}
