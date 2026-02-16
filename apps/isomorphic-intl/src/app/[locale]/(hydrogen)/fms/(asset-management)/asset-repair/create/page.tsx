import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetRepairForm from "@/modules/fms/components/containers/asset-repair/create-edit-asset-repair-form"

export const metadata = {
  ...metaObject("Asset Repair"),
}

const pageHeader = {
  title: "text-create-asset-repair",
  breadcrumb: [
    {
      href: routes.fms.assetRepair,
      name: "text-asset-repair",
    },
    {
      name: "text-create-asset-repair",
    },
  ],
}

export default function AssetRepairCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetRepairForm />
    </>
  )
}
