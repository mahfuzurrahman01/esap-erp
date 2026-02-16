import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"

import CreateEditSalaryStructureForm from "../create-edit-salary-structures-form"

const pageHeader = {
  title: "text-edit-salary-structure",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.salaryStructures,
      name: "text-salary-structures",
    },
    {
      name: "text-edit-salary-structure",
    },
  ],
}
// 32+72 = 104, 24+68 = 92,
const EditSalaryStructure = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditSalaryStructureForm />
    </div>
  )
}

export default EditSalaryStructure
