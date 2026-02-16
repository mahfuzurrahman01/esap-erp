"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-applicants",
  breadcrumb: [
    {
      href: routes.hr.recruitment,
      name: "text-recruitment-dashboard",
    },
    {
      href: routes.hr.applicants,
      name: "text-applicants",
    },
    {
      name: "text-list",
    },
  ],
}

const Applicants = () => {
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.addNewApplicant}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      {/* <EmployeesTable /> */}
    </div>
  )
}

export default Applicants
