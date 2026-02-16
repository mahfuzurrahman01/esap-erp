"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import WorkAddressTable from "@/components/container/hrms/employee-setting-items/work-address/work-address-table"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-work-addresses",
  breadcrumb: [
    {
      href: routes.hr.dashboard,
      name: "text-dashboard",
    },
    {
      href: routes.hr.workingAddress,
      name: "text-work-addresses",
    },
    {
      name: "text-list",
    },
  ],
}

const WorkAddresses = () => {
  const t = useTranslations("form")
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex justify-end md:mt-0">
          <Link href={routes.hr.createWorkAddress}>
            <Button type="button" color="black">
              <PiPlusBold className="me-1.5 h-4 w-4" />
              {t("form-add-new")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <WorkAddressTable />
    </div>
  )
}

export default WorkAddresses
