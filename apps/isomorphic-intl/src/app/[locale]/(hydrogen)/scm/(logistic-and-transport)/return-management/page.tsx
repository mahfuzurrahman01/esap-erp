import { metaObject } from "@/config/site.config"
import ReturnManagementListPage from "@/modules/scm/components/templates/logistic-and-transport/return-management/return-management-list"

export const metadata = {
  ...metaObject("Return Management"),
}

export default function page() {
  return <ReturnManagementListPage />
}
