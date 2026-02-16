import PageHeader from "@/components/base/page-header"
import CreateAppraisalTemplateForm from "@/components/container/hrms/appraisals/appraisal-templates/create-appraisal-templates-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-edit-appraisal-template",
  breadcrumb: [
    {
      href: routes.hr.appraisalTemplate,
      name: "text-appraisal-templates",
    },
    {
      name: "text-edit-appraisal-template",
    },
  ],
}
const EditAppraisalTemplate = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex flex-col border-none bg-gray-0 pt-6 dark:bg-gray-800">
        <CreateAppraisalTemplateForm />
      </div>
    </div>
  )
}

export default EditAppraisalTemplate
