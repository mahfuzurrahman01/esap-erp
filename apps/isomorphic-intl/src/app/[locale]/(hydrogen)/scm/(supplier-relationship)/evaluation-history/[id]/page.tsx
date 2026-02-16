import { metaObject } from "@/config/site.config"
import SupplierEvaluationViewPage from "@/modules/scm/components/templates/supplier-relationship/supplier-evaluation/supplier-evaluation-view"

export const metadata = {
  ...metaObject("Evaluation History Details"),
}

export default function page() {
  return (
    <>
      <SupplierEvaluationViewPage />
    </>
  )
}
