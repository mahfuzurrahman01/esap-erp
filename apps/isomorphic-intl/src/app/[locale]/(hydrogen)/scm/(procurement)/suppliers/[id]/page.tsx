import React from "react"

import { metaObject } from "@/config/site.config"
import SupplierDetails from "@/modules/scm/components/templates/procurement/supplier/supplier-view/supplier-details"

export const metadata = {
  ...metaObject("Supplier Details"),
}

export default function page() {
  return (
    <>
      <SupplierDetails />
    </>
  )
}
