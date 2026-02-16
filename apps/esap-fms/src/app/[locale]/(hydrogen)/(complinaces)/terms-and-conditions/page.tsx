import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import TermsAndConditionsTable from "@/modules/fms/components/containers/terms-and-conditions"

export const metadata = {
  ...metaObject("Terms and Conditions"),
}

const pageHeader = {
  title: "text-terms-and-conditions",
  breadcrumb: [
    {
      name: "text-terms-and-conditions",
    },
  ],
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createTermsAndConditions}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <TermsAndConditionsTable />
    </>
  )
}
