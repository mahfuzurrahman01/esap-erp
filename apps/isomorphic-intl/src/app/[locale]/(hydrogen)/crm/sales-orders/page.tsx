import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesOrdersListTemplate from "@/modules/crm/components/templates/sales-orders"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Sales Orders"),
}

const pageHeader = {
  title: "text-sales-orders",
  breadcrumb: [
    {
      href: routes.crm.salesOrders,
      name: "text-sales-orders",
    },
    {
      name: "text-list",
    },
  ],
}

export default function SalesOrdersPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createSalesOrders}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <SalesOrdersListTemplate />
      </div>
    </>
  )
}
