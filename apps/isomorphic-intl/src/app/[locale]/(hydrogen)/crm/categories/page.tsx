import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CategoryListTemplate from "@/modules/crm/components/templates/categories"

export const metadata = {
  ...metaObject("Category List"),
}

const pageHeader = {
  title: "text-categories",
  breadcrumb: [
    {
      href: routes.crm.categories,
      name: "text-categories",
    },
    {
      name: "text-list",
    },
  ],
}

export default function CategoryListPage() {
  return (
    <div className="@container">
      <CategoryListTemplate pageHeader={pageHeader} />
    </div>
  )
}
