import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditPaymentRequestForm from "@/modules/fms/components/containers/payment-request/create-edit-payment-request-form"

export const metadata = {
  ...metaObject("Create Payment Request"),
}

const pageHeader = {
  title: "text-create-payment-request",
  breadcrumb: [
    {
      href: routes.fms.paymentRequest,
      name: "text-payment-request-list",
    },
    {
      name: "text-create-payment-request",
    },
  ],
}

export default function PaymentRequestCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditPaymentRequestForm />
    </>
  )
}
