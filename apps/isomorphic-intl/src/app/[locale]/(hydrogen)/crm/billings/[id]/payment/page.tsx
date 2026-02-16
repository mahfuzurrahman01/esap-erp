import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

const pageHeader = {
  title: "text-make-payment-request",
  breadcrumb: [
    {
      name: "text-dashboard",
    },
    {
      href: routes.crm.bills,
      name: "text-bill-list",
    },
    {
      name: "text-make-payment-request",
    },
  ],
}

export default async function PaymentRequest(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditPaymentsForm id={params.id} requestFor="CRM" mode="create" />
    </div>
  )
}
