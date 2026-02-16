import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import Countries from "@/modules/fms/components/templates/country"

export const metadata = {
  ...metaObject("Country List"),
}

const pageHeader = {
  title: "text-country",
  breadcrumb: [
    {
      href: routes.fms.country,
      name: "text-home",
    },
    {
      name: "text-country",
    },
  ],
}

export default function CountryPage() {
  return (
    <>
      <Countries pageHeader={pageHeader} />
    </>
  )
}
