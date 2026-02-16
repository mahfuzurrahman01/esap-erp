import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetForm from "@/modules/fms/components/containers/asset/create-edit-asset-form"

export const metadata = {
  ...metaObject("Edit Asset"),
}

const pageHeader = {
  title: "text-edit-asset",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-edit-asset",
    },
  ],
}

export default async function AssetEditPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditAssetForm id={params.id} mode="edit" />
    </>
  )
}
