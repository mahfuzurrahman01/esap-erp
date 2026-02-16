"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import SalaryStructuresTable from "@/components/container/hrms/payroll-configuration/salary-structures/salary-structures-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-salary-structures",
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
      name: "text-list",
    },
  ],
}

const SalaryStructures = () => {
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.createSalaryStructure}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-add-new")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <SalaryStructuresTable />
    </div>
  )
}

export default SalaryStructures
