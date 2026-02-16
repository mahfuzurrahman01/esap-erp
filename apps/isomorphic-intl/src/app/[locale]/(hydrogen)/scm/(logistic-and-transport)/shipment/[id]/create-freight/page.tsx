import { metaObject } from "@/config/site.config"
import CreateFreightPage from "@/modules/scm/components/templates/logistic-and-transport/freight/create-freight"

export const metadata = {
  ...metaObject("Create Freight"),
}

export default function page() {
  return <CreateFreightPage />
}
