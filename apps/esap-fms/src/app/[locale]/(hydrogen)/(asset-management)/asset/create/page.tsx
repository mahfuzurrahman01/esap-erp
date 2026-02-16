import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditAssetForm from "@/modules/fms/components/containers/asset/create-edit-asset-form"

export const metadata = {
  ...metaObject("Create Asset"),
}

const pageHeader = {
  title: "text-create-asset",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-create-asset",
    },
  ],
}

export default function AssetCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditAssetForm />
    </>
  )
}
