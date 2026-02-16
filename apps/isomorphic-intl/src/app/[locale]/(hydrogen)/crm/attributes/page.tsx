import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AttributeListTemplate from "@/modules/crm/components/templates/attributes"

export const metadata = {
  ...metaObject("Attribute List"),
}

const pageHeader = {
  title: "text-attributes",
  breadcrumb: [
    {
      href: routes.crm.attributes,
      name: "text-attributes",
    },
    {
      name: "text-list",
    },
  ],
}

export default function AttributeList() {
  return (
    <div className="@container">
      <AttributeListTemplate pageHeader={pageHeader} />
    </div>
  )
}
