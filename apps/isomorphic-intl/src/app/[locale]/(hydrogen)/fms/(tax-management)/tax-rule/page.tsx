import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import TaxRuleTable from "@/modules/fms/components/containers/tax-rules"

export const metadata = {
  ...metaObject("Tax Rule"),
}

const pageHeader = {
  title: "text-tax-rule",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-tax-rule",
    },
  ],
}

export default function TaxRulePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createTaxRule}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <TaxRuleTable />
    </>
  )
}
