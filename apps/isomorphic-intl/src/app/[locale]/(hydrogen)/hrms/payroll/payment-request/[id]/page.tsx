import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditPaymentRequestForm from "@/modules/fms/components/containers/payment-request/create-edit-payment-request-form"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

const pageHeader = {
  title: "text-make-payment-request",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.payslip,
      name: "text-payslip",
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
      <CreateEditPaymentRequestForm
        id={params.id}
        requestFor="HRMS"
        mode="create"
      />
    </div>
  )
}
