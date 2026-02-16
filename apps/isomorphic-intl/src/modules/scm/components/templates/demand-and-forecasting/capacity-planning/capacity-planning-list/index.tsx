"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import CapacityPlanningList from "@/modules/scm/components/containers/demand-and-forecasting/capacity-planning/capacity-planning-list"

const pageHeader = {
  title: "text-capacity-planning-list",
  breadcrumb: [
    {
      name: "text-demand-forecasting",
    },
    {
      name: "text-capacity-planning-list",
    },
  ],
}

export default function CapacityPlanningListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={
              routes.scm.demandForecasting.capacityPlanning
                .createCapacityPlanning
            }
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <CapacityPlanningList />
    </>
  )
}
