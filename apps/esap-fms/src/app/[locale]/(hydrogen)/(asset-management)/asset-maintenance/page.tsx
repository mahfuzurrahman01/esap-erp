import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import AssetMaintenanceTemplate from "@/modules/fms/components/templates/asset-maintenance-template"

export const metadata = {
  ...metaObject("Asset Maintenance"),
}

const pageHeader = {
  title: "text-asset-maintenance",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-asset-maintenance",
    },
  ],
}

export default function AssetMaintenancePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createAssetMaintenance}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <AssetMaintenanceTemplate />
    </>
  )
}
