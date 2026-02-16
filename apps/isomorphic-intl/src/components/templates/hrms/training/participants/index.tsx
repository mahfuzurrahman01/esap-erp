"use client"

import PageHeader from "@/components/base/page-header"
import ParticipantsTable from "@/components/container/hrms/training/participants/participants-table"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-participants",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.trainingProgram,
      name: "text-training-program",
    },
    {
      name: "text-participants",
    },
  ],
}

const Participants = () => {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0"></div>
      </PageHeader>
      <ParticipantsTable />
    </div>
  )
}

export default Participants
