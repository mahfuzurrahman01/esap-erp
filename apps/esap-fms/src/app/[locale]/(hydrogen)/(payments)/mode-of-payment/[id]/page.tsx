import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditModeOfPayment from "@/modules/fms/components/templates/mode-fo-payment/create-edit-mode-of-payment"

export const metadata = {
  ...metaObject("Mode Of Payment"),
}

const pageHeader = {
  title: "text-mode-of-payment",
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
      name: "text-view-mode-of-payment",
    },
  ],
}

export default async function ModeOfPaymentDetailsPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editModeOfPayment(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditModeOfPayment id={params.id} mode="view" />
    </>
  )
}
