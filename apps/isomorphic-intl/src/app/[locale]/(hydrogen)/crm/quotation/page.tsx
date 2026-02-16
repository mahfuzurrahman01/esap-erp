import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import QuotationListTemplate from "@/modules/crm/components/templates/quotation"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Quotation List"),
}

const pageHeader = {
  title: "text-quotation",
  breadcrumb: [
    {
      href: routes.crm.quotation,
      name: "text-quotation",
    },
    {
      name: "text-list",
    },
  ],
}

export default function QuotationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.quotationCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <QuotationListTemplate />
      </div>
    </>
  )
}
