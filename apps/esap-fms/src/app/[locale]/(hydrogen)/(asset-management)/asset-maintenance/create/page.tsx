import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMaintenanceForm from "@/modules/fms/components/containers/asset-maintenance/create-edit-asset-maintenance-form"

export const metadata = {
  ...metaObject("Create Asset Maintenance"),
}

const pageHeader = {
  title: "text-create-asset-maintenance",
  breadcrumb: [
    {
      href: routes.fms.assetMaintenance,
      name: "text-asset-maintenance",
    },
    {
      name: "text-create-asset-maintenance",
    },
  ],
}

export default function AssetMaintenanceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetMaintenanceForm />
    </>
  )
}
