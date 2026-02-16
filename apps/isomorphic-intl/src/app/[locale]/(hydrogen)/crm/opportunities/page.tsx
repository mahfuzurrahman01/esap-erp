import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import OpportunityListTemplate from "@/modules/crm/components/templates/opportunities"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Opportunity List"),
}

const pageHeader = {
  title: "text-opportunity",
  breadcrumb: [
    {
      href: routes.crm.opportunities,
      name: "text-opportunity",
    },
    {
      name: "text-list",
    },
  ],
}

export default function OpportunityPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.opportunityCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <OpportunityListTemplate />
      </div>
    </>
  )
}
