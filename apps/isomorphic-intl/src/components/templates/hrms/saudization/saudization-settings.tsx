"use client"

import PageHeader from "@/components/base/page-header"
import SaudizationConfigurationForm from "@/components/container/hrms/saudization/saudization-configuration-form"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-configuration",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.saudization,
      name: "text-saudization",
    },
    {
      name: "text-configuration",
    },
  ],
}

const SaudizationSettings = () => {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="card-shadow flex grow flex-col justify-between rounded-2xl p-5 @container md:p-6">
        <SaudizationConfigurationForm />
      </div>
    </div>
  )
}

export default SaudizationSettings
