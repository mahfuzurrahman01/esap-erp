import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ContactListTemplate from "@/modules/crm/components/templates/contacts"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Contact History"),
}

const pageHeader = {
  title: "text-contact-history",
  breadcrumb: [
    {
      href: routes.crm.contacts,
      name: "text-contact",
    },
    {
      name: "text-list",
    },
  ],
}

export default function ContactPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createContact}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <ContactListTemplate />
      </div>
    </>
  )
}
