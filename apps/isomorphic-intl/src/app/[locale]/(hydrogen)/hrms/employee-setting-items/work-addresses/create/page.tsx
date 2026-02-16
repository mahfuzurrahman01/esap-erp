import PageHeader from "@/components/base/page-header"
import WorkAddressFormView from "@/components/container/hrms/employee-setting-items/work-address/work-address-form-view"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-create-work-address",
  breadcrumb: [
    {
      href: routes.hr.dashboard,

      name: "text-dashboard",
    },
    {
      href: routes.hr.workingAddress,
      name: "text-work-addresses",
    },

    {
      name: "text-create-work-address",
    },
  ],
}

const CreateWorkAddress = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <WorkAddressFormView mode="create" />
    </div>
  )
}

export default CreateWorkAddress
