import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditPaymentRequestForm from "@/modules/fms/components/containers/payment-request/create-edit-payment-request-form"

export const metadata = {
  ...metaObject("Edit Payment"),
}

const pageHeader = {
  title: "text-edit-payment",
  breadcrumb: [
    {
      href: routes.fms.paymentRequest,
      name: "text-payment-list",
    },
    {
      name: "text-edit-payment",
    },
  ],
}

export default async function PaymentEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditPaymentRequestForm id={params.id} mode="edit" />
    </>
  )
}
