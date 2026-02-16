import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import ModeOfPaymentTable from "@/modules/fms/components/containers/mode-of-payment"

export const metadata = {
  ...metaObject("Mode Of Payment"),
}

const pageHeader = {
  title: "text-mode-of-payment",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-mode-of-payment",
    },
  ],
}

export default function ModeOfPaymentPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createModeOfPayment}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <ModeOfPaymentTable />
    </>
  )
}
