import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PaymentRequestTable from "@/modules/fms/components/containers/payment-request"

export const metadata = {
  ...metaObject("Payment Request List"),
}

const pageHeader = {
  title: "text-payment-request-list",
  breadcrumb: [
    {
      href: routes.fms.paymentRequest,
      name: "text-dashboard",
    },
    {
      name: "text-payment-request-list",
    },
  ],
}

export default function PaymentRequestPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createPaymentRequest}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <PaymentRequestTable />
    </>
  )
}
