import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMovementForm from "@/modules/fms/components/containers/asset-movement/create-edit-asset-movement-form"

export const metadata = {
  ...metaObject("Edit Asset"),
}

const pageHeader = {
  title: "text-edit-asset-movement",
  breadcrumb: [
    {
      href: routes.fms.assetMovement,
      name: "text-asset",
    },
    {
      name: "text-edit-asset-movement",
    },
  ],
}

export default async function AssetEditPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetMovementForm id={params.id} mode="edit" />
    </>
  )
}
