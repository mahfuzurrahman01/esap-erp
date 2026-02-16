import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import AssetDepreciationLedgerTemplate from "@/modules/fms/components/templates/reports/asset-depreciation-ledger"

export const metadata = {
  ...metaObject("Asset Depreciation Ledger"),
}

const pageHeader = {
  title: "text-asset-depreciation-ledger",
}

export default function AssetDepreciationLedgerPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <AssetDepreciationLedgerTemplate />
    </>
  )
}
