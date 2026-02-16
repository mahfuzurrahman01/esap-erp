import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"

const pageHeader = {
  title: "text-payment-entry",
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
      name: "text-payment-entry",
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
      <CreateEditPaymentsForm id={params.id} requestFor="HRMS" mode="create" />
    </div>
  )
}
