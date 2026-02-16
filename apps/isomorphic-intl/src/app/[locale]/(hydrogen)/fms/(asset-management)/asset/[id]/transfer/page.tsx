import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetMovementForm from "@/modules/fms/components/containers/asset-movement/create-edit-asset-movement-form"

export const metadata = {
  ...metaObject("Asset Movement"),
}

const pageHeader = {
  title: "text-asset-movement",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-asset-movement",
    },
  ],
}

export default async function AssetMovementPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetMovementForm id={params.id} mode="create" />
    </>
  )
}
