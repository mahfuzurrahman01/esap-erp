import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

const pageHeader = {
  title: "text-make-payment-entry",
  breadcrumb: [
    {
      href: routes.scm.procurement.invoiceBills.invoiceBills,
      name: "text-invoice-bills",
    },
    {
      name: "text-make-payment-entry",
    },
  ],
}

export default async function PaymentEntry(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditPaymentsForm id={params.id} requestFor="SCM" mode="create" />
    </div>
  )
}
