import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMaintenanceForm from "@/modules/fms/components/containers/asset-maintenance/create-edit-asset-maintenance-form"

export const metadata = {
  ...metaObject("Maintain Asset"),
}

const pageHeader = {
  title: "text-maintain-asset",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-maintain-asset",
    },
  ],
}

export default async function AssetMaintainPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetMaintenanceForm id={params.id} mode="create" />
    </>
  )
}
