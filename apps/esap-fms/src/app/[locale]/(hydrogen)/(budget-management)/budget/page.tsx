import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BudgetTable from "@/modules/fms/components/containers/budget"

export const metadata = {
  ...metaObject("Budget List"),
}

const pageHeader = {
  title: "text-budget-list",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-budget-list",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createBudget}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BudgetTable />
    </>
  )
}
