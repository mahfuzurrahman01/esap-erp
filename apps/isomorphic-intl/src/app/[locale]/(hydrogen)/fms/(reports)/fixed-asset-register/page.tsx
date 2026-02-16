import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import FixedAssetTemplate from "@/modules/fms/components/templates/reports/fixed-asset-template/fixed-asset-template"

export const metadata = {
  ...metaObject("Fixed Asset Register"),
}

const pageHeader = {
  title: "text-fixed-asset-register",
}

export default function FixedAssetRegisterPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <FixedAssetTemplate />
    </>
  )
}
