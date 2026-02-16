"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"

import ApplicationDetailsContainer from "./application-details-container"

const pageHeader = {
  title: "text-application-details",
  breadcrumb: [
    {
      href: routes.hr.applications,
      name: "text-applications-list",
    },
    {
      name: "text-application-details",
    },
  ],
}

const RecruitmentDetails = () => {
  const params = useParams()
  const applicationId = params.applicationId as string

  return (
    <div>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ApplicationDetailsContainer applicationId={applicationId} />
    </div>
  )
}

export default RecruitmentDetails
