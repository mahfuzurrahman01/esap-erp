import PageHeader from "@/components/base/page-header"
import ApplicationForm from "@/components/container/hrms/recruitment-onboarding/applications/application-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-add-new-application",
  breadcrumb: [
    {
      href: routes.hr.recruitment,
      name: "text-recruitment-dashboard",
    },
    {
      name: "text-add-new-application",
    },
  ],
}
const AddNewApplication = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col border-none bg-gray-0 dark:bg-gray-800">
        <ApplicationForm />
      </div>
    </div>
  )
}

export default AddNewApplication
