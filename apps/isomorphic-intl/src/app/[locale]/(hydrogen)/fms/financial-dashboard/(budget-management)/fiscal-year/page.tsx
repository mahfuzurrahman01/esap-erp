import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import FiscalYearList from "@/modules/fms/components/templates/fiscal-year-template/fiscal-year-list"

export const metadata = {
  ...metaObject("Fiscal Year List"),
}

const pageHeader = {
  title: "text-fiscal-year",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-fiscal-year",
    },
  ],
}

export default function FiscalYearPage() {
  return (
    <>
      <FiscalYearList pageHeader={pageHeader} />
    </>
  )
}
