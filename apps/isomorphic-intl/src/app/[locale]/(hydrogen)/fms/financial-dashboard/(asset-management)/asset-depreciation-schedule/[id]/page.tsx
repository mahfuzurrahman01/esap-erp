import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetDepreciationForm from "@/modules/fms/components/containers/asset-depreciation/create-edit-asset-depreciation-form"

export const metadata = {
  ...metaObject("View Asset Depreciation Schedule"),
}

const pageHeader = {
  title: "text-asset-depreciation-schedule",
  breadcrumb: [
    {
      href: routes.fms.assetDepreciationSchedule,
      name: "text-asset-depreciation-schedule",
    },
    {
      name: "text-view-asset-depreciation-schedule",
    },
  ],
}

export default async function AssetDepreciationScheduleDetailsPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetDepreciationForm id={params.id} />
    </>
  )
}
