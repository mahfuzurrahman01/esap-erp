import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetDepreciationForm from "@/modules/fms/components/containers/asset-depreciation/create-edit-asset-depreciation-form"

export const metadata = {
  ...metaObject("Create Asset Depreciation Schedule"),
}

const pageHeader = {
  title: "text-create-asset-depreciation-schedule",
  breadcrumb: [
    {
      href: routes.fms.assetDepreciationSchedule,
      name: "text-asset-depreciation-schedule",
    },
    {
      name: "text-create-asset-depreciation-schedule",
    },
  ],
}

export default function AssetDepreciationScheduleCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetDepreciationForm />
    </>
  )
}
