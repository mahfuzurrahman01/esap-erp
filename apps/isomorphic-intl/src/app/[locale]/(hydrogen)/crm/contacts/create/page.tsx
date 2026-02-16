import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ContactCreateTemplate from "@/modules/crm/components/templates/contacts/create"

export const metadata = {
  ...metaObject("Contact Create"),
}

const pageHeader = {
  title: "text-create-contact",
  breadcrumb: [
    {
      name: "text-contact",
    },
    {
      href: routes.crm.contacts,
      name: "text-contact-list",
    },
    {
      name: "text-create-contact",
    },
  ],
}

export default function ContactCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ContactCreateTemplate />
    </>
  )
}
