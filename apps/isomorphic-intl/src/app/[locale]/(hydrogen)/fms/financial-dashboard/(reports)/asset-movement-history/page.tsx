import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import AssetMovementHistoryTemplate from "@/modules/fms/components/templates/reports/asset-movement-history"

export const metadata = {
  ...metaObject("Asset Movement History Report"),
}

const pageHeader = {
  title: "text-asset-movement-history",
}

export default function AssetMovementHistoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <AssetMovementHistoryTemplate />
    </>
  )
}
