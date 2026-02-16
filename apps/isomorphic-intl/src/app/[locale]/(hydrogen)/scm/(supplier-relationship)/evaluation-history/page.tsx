import { metaObject } from "@/config/site.config"
import SupplierEvaluationListPage from "@/modules/scm/components/templates/supplier-relationship/supplier-evaluation/supplier-evaluation-list"

export const metadata = {
  ...metaObject("Evaluation History"),
}

export default function page() {
  return (
    <>
      <SupplierEvaluationListPage />
    </>
  )
}
