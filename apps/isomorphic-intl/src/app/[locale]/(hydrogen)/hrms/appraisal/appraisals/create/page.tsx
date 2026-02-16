import PageHeader from "@/components/base/page-header"
import CreateAppraisalForm from "@/components/container/hrms/appraisals/appraisal-list/create-appraisals-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-add-new-appraisal",
  breadcrumb: [
    {
      href: routes.hr.appraisals,
      name: "text-appraisals",
    },
    {
      name: "text-add-new-appraisal",
    },
  ],
}
const AddNewAppraisal = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateAppraisalForm />
    </div>
  )
}

export default AddNewAppraisal
