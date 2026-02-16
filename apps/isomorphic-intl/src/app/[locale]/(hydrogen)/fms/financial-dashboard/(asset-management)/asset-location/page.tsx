import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AssetLocationList from "@/modules/fms/components/templates/asset-location"

export const metadata = {
  ...metaObject("Asset Location List"),
}

const pageHeader = {
  title: "text-asset-location",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-dashboard",
    },
    {
      name: "text-asset-location",
    },
  ],
}

export default function AssetLocationPage() {
  return (
    <>
      <AssetLocationList pageHeader={pageHeader} />
    </>
  )
}
