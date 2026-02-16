import { metaObject } from "@/config/site.config"
import FreightEditPage from "@/modules/scm/components/templates/logistic-and-transport/freight/freight-edit"

export const metadata = {
  ...metaObject("Freight Edit"),
}

export default function page() {
  return <FreightEditPage />
}
