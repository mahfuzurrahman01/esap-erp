import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AssetDepreciationScheduleList from "@/modules/fms/components/templates/asset-depreciation-list"

export const metadata = {
  ...metaObject("Asset Depreciation Schedule"),
}

const pageHeader = {
  title: "text-asset-depreciation-schedule",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-asset-depreciation-schedule",
    },
  ],
}

export default function AssetDepreciationSchedulePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <AssetDepreciationScheduleList />
    </>
  )
}
