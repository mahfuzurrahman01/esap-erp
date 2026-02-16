import PageHeader from "@/components/base/page-header"
import AppraisalFeedbackForm from "@/components/container/hrms/appraisals/appraisal-feedback/appraisal-feedback-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-appraisal-feedback",
  breadcrumb: [
    {
      href: routes.hr.appraisals,
      name: "text-appraisals",
    },
    {
      name: "text-appraisal-feedback",
    },
  ],
}
const AppraisalFeedback = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AppraisalFeedbackForm />
    </div>
  )
}

export default AppraisalFeedback
