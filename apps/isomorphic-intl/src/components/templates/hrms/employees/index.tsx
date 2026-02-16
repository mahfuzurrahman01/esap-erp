"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import EmployeesTable from "@/components/container/hrms/employee/all-employees/employees-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-employees",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.employees,
      name: "text-employees",
    },
    {
      name: "text-list",
    },
  ],
}

const Employees = () => {
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.createEmployee}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-add-new")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <EmployeesTable />
    </div>
  )
}

export default Employees
