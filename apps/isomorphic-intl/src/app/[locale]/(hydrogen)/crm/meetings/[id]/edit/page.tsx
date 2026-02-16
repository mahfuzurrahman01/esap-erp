import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import MeetingEditTemplate from "@/modules/crm/components/templates/meetings/edit"

export const metadata = {
  ...metaObject("Meeting Edit"),
}
const pageHeader = {
  title: "text-edit-meeting",
  breadcrumb: [
    {
      name: "text-communication",
    },
    {
      href: routes.crm.meetings,
      name: "text-meeting-list",
    },
    {
      name: "text-edit-meeting",
    },
  ],
}

export default async function MeetingEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <MeetingEditTemplate id={params.id} />
      </div>
    </>
  )
}
