import { metaObject } from "@/config/site.config"
import FreightListPage from "@/modules/scm/components/templates/logistic-and-transport/freight/freight-list"

export const metadata = {
  ...metaObject("Freight"),
}

export default function page() {
  return <FreightListPage />
}
