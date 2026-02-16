import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CustomerListTemplate from "@/modules/crm/components/templates/customers"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Customer List"),
}

const pageHeader = {
  title: "text-customer",
  breadcrumb: [
    {
      href: routes.crm.customers,
      name: "text-customer",
    },
    {
      name: "text-list",
    },
  ],
}

export default function CustomerPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createCustomer}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <CustomerListTemplate />
      </div>
    </>
  )
}
