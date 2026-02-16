"use client"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import PaymentMethodsTable from "@/modules/scm/components/containers/procurement/procurement-settings/payment-methods/payment-methods-table"
import { useTranslations } from "next-intl"
import PaymentMethodsFormDrawerView from "@/modules/scm/components/containers/procurement/procurement-settings/payment-methods/payment-methods-drawer-form"
import { PiPlusBold } from "react-icons/pi"
import { messages } from "@/config/messages"

const pageHeader = {
  title: "text-payment-methods",
  breadcrumb: [
    {
      href: routes.scm.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.scm.procurement.setting.paymentMethods,
      name: "text-payment-methods",
    },
  ],
}

const PaymentMethods = () => {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <PaymentMethodsFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <PaymentMethodsTable />
    </div>
  )
}

export default PaymentMethods
