import PageHeader from "@/components/base/page-header"
import PayslipForm from "@/components/container/hrms/payroll/payslip/payslip-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-edit-payslip",
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
      name: "text-edit-payslip",
    },
  ],
}
// 32+72 = 104, 24+68 = 92,
const EditPayslip = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PayslipForm mode="edit" />
    </div>
  )
}

export default EditPayslip
