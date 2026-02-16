import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CampaignListTemplate from "@/modules/crm/components/templates/campaign"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Campaign List"),
}

const pageHeader = {
  title: "text-campaigns",
  breadcrumb: [
    {
      href: routes.crm.campaigns,
      name: "text-campaigns",
    },
    {
      name: "text-list",
    },
  ],
}

export default function CampaignsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.campaignCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <CampaignListTemplate />
      </div>
    </>
  )
}
