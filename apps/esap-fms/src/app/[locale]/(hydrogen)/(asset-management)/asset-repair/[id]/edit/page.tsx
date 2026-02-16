import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetRepairForm from "@/modules/fms/components/containers/asset-repair/create-edit-asset-repair-form"

export const metadata = {
  ...metaObject("Edit Asset"),
}

const pageHeader = {
  title: "text-edit-asset-repair",
  breadcrumb: [
    {
      href: routes.fms.assetRepair,
      name: "text-asset",
    },
    {
      name: "text-edit-asset-repair",
    },
  ],
}

export default async function AssetEditPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetRepairForm id={params.id} mode="edit" />
    </>
  )
}
