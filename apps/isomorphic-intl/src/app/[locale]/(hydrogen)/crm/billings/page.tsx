import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BillListTemplate from "@/modules/crm/components/templates/bills"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Bill List"),
}

const pageHeader = {
  title: "text-bill-list",
  breadcrumb: [
    {
      href: routes.crm.bills,
      name: "text-bills",
    },
    {
      name: "text-list",
    },
  ],
}

export default function BillPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createBill}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <BillListTemplate />
      </div>
    </>
  )
}
