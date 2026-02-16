import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AssetCategoryList from "@/modules/fms/components/templates/asset-category"

export const metadata = {
  ...metaObject("Asset Category List"),
}

const pageHeader = {
  title: "text-asset-category",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-asset-category",
    },
  ],
}

export default function AssetCategoryPage() {
  return (
    <>
      <AssetCategoryList pageHeader={pageHeader} />
    </>
  )
}
