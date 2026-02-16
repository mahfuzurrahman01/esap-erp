import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

export const metadata = {
  ...metaObject("Create Payment"),
}

const pageHeader = {
  title: "text-create-payment",
  breadcrumb: [
    {
      href: routes.fms.payments,
      name: "text-payment-list",
    },
    {
      name: "text-create-payment",
    },
  ],
}

export default function PaymentCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditPaymentsForm />
    </>
  )
}
