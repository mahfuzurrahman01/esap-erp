"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import PayslipTable from "@/components/container/hrms/payroll/payslip/payslip-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-payslip",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.payslip,
      name: "text-payslip",
    },
    {
      name: "text-list",
    },
  ],
}

const Payslip = () => {
  const t = useTranslations("form")

  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.createPayslip}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t(messages.addNew)}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <PayslipTable />
    </div>
  )
}

export default Payslip
