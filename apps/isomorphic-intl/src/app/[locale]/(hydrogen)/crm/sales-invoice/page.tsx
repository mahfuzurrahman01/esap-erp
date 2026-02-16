import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesInvoiceListTemplate from "@/modules/crm/components/templates/sales-invoice"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Sales Invoice List"),
}

const pageHeader = {
  title: "text-sales-invoice-list",
  breadcrumb: [
    {
      href: routes.crm.salesInvoice,
      name: "text-sales-invoice",
    },
    {
      name: "text-list",
    },
  ],
}

export default function SalesInvoicePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.invoiceCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <SalesInvoiceListTemplate />
      </div>
    </>
  )
}
