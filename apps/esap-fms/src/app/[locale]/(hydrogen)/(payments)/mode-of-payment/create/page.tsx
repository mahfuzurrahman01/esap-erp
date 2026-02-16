import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditModeOfPayment from "@/modules/fms/components/templates/mode-fo-payment/create-edit-mode-of-payment"

export const metadata = {
  ...metaObject("Create Mode Of Payment"),
}

const pageHeader = {
  title: "text-create-mode-of-payment",
  breadcrumb: [
    {
      href: routes.fms.modeOfPayment,
      name: "text-home",
    },
    {
      name: "text-create-mode-of-payment",
    },
  ],
}

export default function CreateModeOfPaymentPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditModeOfPayment />
    </>
  )
}
