"use client"

import PageHeader from "@/components/base/page-header"
import AddOffDaysForm from "@/components/container/hrms/attendance-and-leave/off-day/add-off-days-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-off-days",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.offDays,
      name: "text-off-days",
    },
    {
      name: "text-add-off-days",
    },
  ],
}

const AddOffDays = () => {
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col border-none bg-gray-0 dark:bg-gray-800">
        <AddOffDaysForm />
      </div>
    </div>
  )
}

export default AddOffDays
