"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import SalaryCategoryFormDrawerView from "@/components/container/hrms/payroll-configuration/salary-category/salary-category-form-drawer"
import SalaryCategoryTable from "@/components/container/hrms/payroll-configuration/salary-category/salary-category-table"
import { Button } from "@/components/ui"
import { messages } from "@/config/messages"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-salary-category",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.salaryCategory,
      name: "text-salary-category",
    },
    {
      name: "text-list",
    },
  ],
}

const SalaryCategory = () => {
  const t = useTranslations("form")
  const { openDrawer } = useDrawer()
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Button
            type="button"
            color="black"
            onClick={() =>
              openDrawer({
                view: <SalaryCategoryFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem]",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t(messages.addNew)}
          </Button>
        </div>
      </PageHeader>
      <SalaryCategoryTable />
    </div>
  )
}

export default SalaryCategory
