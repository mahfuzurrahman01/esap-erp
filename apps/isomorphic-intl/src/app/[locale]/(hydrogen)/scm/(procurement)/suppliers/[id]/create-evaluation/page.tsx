import React from "react"

import { metaObject } from "@/config/site.config"
import SupplierEvaluationCreatePage from "@/modules/scm/components/templates/supplier-relationship/supplier-evaluation/create-supplier-evaluation"

export const metadata = {
  ...metaObject("Supplier Create Evaluation"),
}

export default function page() {
  return (
    <>
      <SupplierEvaluationCreatePage />
    </>
  )
}
