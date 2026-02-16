import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMovementForm from "@/modules/fms/components/containers/asset-movement/create-edit-asset-movement-form"

export const metadata = {
  ...metaObject("Create Asset"),
}

const pageHeader = {
  title: "text-create-asset-movement",
  breadcrumb: [
    {
      href: routes.fms.assetMovement,
      name: "text-asset",
    },
    {
      name: "text-create-asset-movement",
    },
  ],
}

export default function AssetMovementCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetMovementForm />
    </>
  )
}
