import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import UserEditComponent from "@/modules/crm/components/templates/users/edit"

export const metadata = {
  ...metaObject("Edit User"),
}

const pageHeader = {
  title: "text-edit-user",
  breadcrumb: [
    {
      href: routes.crm.dashboard,
      name: "text-home",
    },
    {
      href: routes.crm.users,
      name: "text-users",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function UserProfile(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <UserEditComponent id={params.id} mode="edit" />
      </div>
    </>
  )
}
