import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ContactEditTemplate from "@/modules/crm/components/templates/contacts/edit"

export const metadata = {
  ...metaObject("Contact Edit"),
}
const pageHeader = {
  title: "text-edit-contact",
  breadcrumb: [
    {
      name: "text-communication",
    },
    {
      href: routes.crm.contacts,
      name: "text-contact-list",
    },
    {
      name: "text-edit-contact",
    },
  ],
}

export default async function ContactEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <ContactEditTemplate id={params.id} />
      </div>
    </>
  )
}
