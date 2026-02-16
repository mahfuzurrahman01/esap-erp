import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import AssetRepairHistoryTemplate from "@/modules/fms/components/templates/reports/asset-repair-history"

export const metadata = {
  ...metaObject("Asset Repair History Report"),
}

const pageHeader = {
  title: "text-asset-repair-history",
}

export default function AssetRepairHistoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <AssetRepairHistoryTemplate />
    </>
  )
}
