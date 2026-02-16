import PageHeader from "@/components/base/page-header"
import EmployeeBasicInformationForm from "@/components/container/hrms/employee/basic-information/basic-information-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-add-new-applicant",
  breadcrumb: [
    {
      href: routes.hr.recruitment,
      name: "text-recruitment-dashboard",
    },
    {
      href: routes.hr.applicants,
      name: "text-applicants",
    },
    {
      name: "text-add-new-applicant",
    },
  ],
}
const AddNewApplicant = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col border-none bg-gray-0 dark:bg-gray-800">
        <EmployeeBasicInformationForm />
      </div>
    </div>
  )
}

export default AddNewApplicant
