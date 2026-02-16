import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BudgetTemplateTable from "@/modules/fms/components/containers/budget-template"

export const metadata = {
  ...metaObject("Budget Distribution List"),
}

const pageHeader = {
  title: "text-budget-distribution-list",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-budget-distribution",
    },
    {
      name: "text-budget-distribution-list",
    },
  ],
}

export default function BudgetDistributionPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createBudgetDistribution}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BudgetTemplateTable />
    </>
  )
}
