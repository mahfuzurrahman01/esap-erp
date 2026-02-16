import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ZatcaCategories from "@/modules/fms/components/templates/zatca-category"

export const metadata = {
  ...metaObject("Zatca Category List"),
}

const pageHeader = {
  title: "text-zatca-category",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-zatca-category",
    },
  ],
}

export default function zatcaCategoryPage() {
  return (
    <>
      <ZatcaCategories pageHeader={pageHeader} />
    </>
  )
}
