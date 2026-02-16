import PageHeader from "@/components/base/page-header"
import RecruitmentForm from "@/components/container/hrms/recruitment-onboarding/recruitment-information-form.tsx/recruitment-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-edit-recruitment",
  breadcrumb: [
    {
      href: routes.hr.recruitment,
      name: "text-recruitment-dashboard",
    },
    {
      name: "text-edit-recruitment",
    },
  ],
}
const EditRecruitment = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col border-none bg-gray-0 dark:bg-gray-800">
        <RecruitmentForm />
      </div>
    </div>
  )
}

export default EditRecruitment
