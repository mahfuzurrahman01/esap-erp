import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import AssetTable from "@/modules/fms/components/containers/asset"

export const metadata = {
  ...metaObject("Asset"),
}

const pageHeader = {
  title: "text-asset",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-dashboard",
    },
    {
      name: "text-asset",
    },
  ],
}

export default function AssetPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createAsset}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <AssetTable />
    </>
  )
}
