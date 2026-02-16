import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

export const metadata = {
  ...metaObject("Edit Payment"),
}

const pageHeader = {
  title: "text-edit-payment",
  breadcrumb: [
    {
      href: routes.fms.payments,
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
      <CreateEditPaymentsForm id={params.id} mode="edit" />
    </>
  )
}
