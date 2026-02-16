import PageHeader from "@/components/base/page-header"
import EmployeeBasicInformationForm from "@/components/container/hrms/employee/basic-information/basic-information-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-create-employee",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.employees,
      name: "text-employees",
    },
    {
      name: "text-create-employee",
    },
  ],
}
// 32+72 = 104, 24+68 = 92,
const CreateEmployee = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col border-none bg-gray-0 dark:bg-gray-800">
        <EmployeeBasicInformationForm />
      </div>
    </div>
  )
}

export default CreateEmployee
