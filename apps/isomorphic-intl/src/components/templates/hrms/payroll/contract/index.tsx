"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import EmployeeContractTable from "@/components/container/hrms/payroll/employee-contract/employee-contract-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-employee-contracts",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.employeeContracts,
      name: "text-employee-contracts",
    },
    {
      name: "text-list",
    },
  ],
}

const EmployeeContracts = () => {
  const t = useTranslations("form")

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.createContract}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <EmployeeContractTable />
    </div>
  )
}

export default EmployeeContracts
