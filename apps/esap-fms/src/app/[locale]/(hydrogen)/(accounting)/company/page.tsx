import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CompanyTable from "@/modules/fms/components/containers/accounting/company/table"

export const metadata = {
  ...metaObject("Company List"),
}

const pageHeader = {
  title: "text-company",
  breadcrumb: [
    {
      href: routes.fms.company,
      name: "text-home",
    },
    {
      name: "text-company",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createCompany}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <CompanyTable />
    </>
  )
}
