import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditModeOfPayment from "@/modules/fms/components/templates/mode-fo-payment/create-edit-mode-of-payment"

export const metadata = {
  ...metaObject("Edit Mode Of Payment"),
}

const pageHeader = {
  title: "text-edit-mode-of-payment",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      href: routes.fms.modeOfPayment,
      name: "text-mode-of-payment",
    },
    {
      name: "text-edit-mode-of-payment",
    },
  ],
}

export default async function ModeOfPaymentEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditModeOfPayment id={parseInt(params.id)} mode="edit" />
    </>
  )
}
