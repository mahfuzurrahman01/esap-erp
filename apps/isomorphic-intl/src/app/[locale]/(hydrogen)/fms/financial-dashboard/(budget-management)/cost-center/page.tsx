import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CostCenters from "@/modules/fms/components/templates/cost-centers"

export const metadata = {
  ...metaObject("Cost Center List"),
}

const pageHeader = {
  title: "text-cost-center",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-cost-center",
    },
  ],
}

export default function CostCenterPage() {
  return (
    <>
      <CostCenters pageHeader={pageHeader} />
    </>
  )
}
