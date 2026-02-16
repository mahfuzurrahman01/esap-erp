import PageHeader from "@/components/base/page-header"
import EmployeeContractFormView from "@/components/container/hrms/payroll/employee-contract/employee-contract-form-view"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-create-contract",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.employeeContracts,
      name: "text-employee-contracts",
    },
    {
      name: "text-create-contract",
    },
  ],
}
// 32+72 = 104, 24+68 = 92,
const CreateContract = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <EmployeeContractFormView />
    </div>
  )
}

export default CreateContract
