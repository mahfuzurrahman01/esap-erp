import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMaintenanceForm from "@/modules/fms/components/containers/asset-maintenance/create-edit-asset-maintenance-form"

export const metadata = {
  ...metaObject("Edit Asset Maintenance"),
}

const pageHeader = {
  title: "text-edit-asset-maintenance",
  breadcrumb: [
    {
      href: routes.fms.assetMaintenance,
      name: "text-asset-maintenance",
    },
    {
      name: "text-edit-asset-maintenance",
    },
  ],
}

export default async function AssetMaintenanceEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetMaintenanceForm id={params.id} mode="edit" />
    </>
  )
}
