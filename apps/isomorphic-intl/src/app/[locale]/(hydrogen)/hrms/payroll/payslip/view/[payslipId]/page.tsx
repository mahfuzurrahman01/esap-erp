import PageHeader from "@/components/base/page-header"
import PayslipForm from "@/components/container/hrms/payroll/payslip/payslip-form"
import PencilIcon from "@/components/icons/pencil"
import { PrintIcon } from "@/components/icons/print"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export default async function ViewPayslip(props: {
  params: Promise<{ payslipId: number }>
}) {
  const params = await props.params
  const pageHeader = {
    title: "text-view-payslip",
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
        name: "text-view-payslip",
      },
    ],
  }

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.hr.printPayslip(params.payslipId)}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <TranslatableButton
            href={routes.hr.editPayslip(params.payslipId)}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
        </div>
      </PageHeader>
      <PayslipForm mode="view" />
    </div>
  )
}
