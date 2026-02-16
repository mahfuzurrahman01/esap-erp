import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TaxCategories from "@/modules/fms/components/templates/tax-category"

export const metadata = {
  ...metaObject("Tax Category List"),
}

const pageHeader = {
  title: "text-tax-category",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-tax-category",
    },
  ],
}

export default function TaxCategoryPage() {
  return (
    <>
      <TaxCategories pageHeader={pageHeader} />
    </>
  )
}
