import { metaObject } from "@/config/site.config"
import SupplierEvaluationEditPage from "@/modules/scm/components/templates/supplier-relationship/supplier-evaluation/supplier-evaluation-edit"

export const metadata = {
  ...metaObject("Evaluation History Edit"),
}

export default function page() {
  return (
    <>
      <SupplierEvaluationEditPage />
    </>
  )
}
