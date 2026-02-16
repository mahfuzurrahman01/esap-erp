"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

import RecruitmentDetailsContainer from "./recruitment-details-container"

const pageHeader = {
  title: "text-recruitment-dashboard",
  breadcrumb: [
    {
      href: routes.hr.recruitment,
      name: "text-recruitment-dashboard",
    },
    {
      name: "text-recruitment-details",
    },
  ],
}

const RecruitmentDetails = () => {
  const params = useParams()
  const recruitmentId = params.recruitmentId as string
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.editRecruitment(recruitmentId)}>
            <Button type="button" color="black">
              <PencilIcon className="me-1.5 h-4 w-4" />
              {t("form-edit")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <RecruitmentDetailsContainer recruitmentId={recruitmentId} />
    </div>
  )
}

export default RecruitmentDetails
