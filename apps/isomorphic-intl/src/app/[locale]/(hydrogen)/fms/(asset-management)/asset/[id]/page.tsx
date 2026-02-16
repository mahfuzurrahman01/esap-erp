import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AssetView from "@/modules/fms/components/templates/asset-template/asset-view"

export const metadata = {
  ...metaObject("View Asset"),
}

const pageHeader = {
  title: "text-asset",
  breadcrumb: [
    {
      href: routes.fms.asset,
      name: "text-asset",
    },
    {
      name: "text-view-asset",
    },
  ],
}

export default async function AssetDetailsPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <AssetView id={params.id} pageHeader={pageHeader} />
    </>
  )
}
