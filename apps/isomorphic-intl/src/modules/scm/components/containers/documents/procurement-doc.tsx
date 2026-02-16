"use client"

import ProcurementOperation from "./feature-doc/procurement-operation"
import SupplierDoc from "./feature-doc/supplier"

export default function ProcurementDoc() {

  return (
    <div>
      <SupplierDoc />
      <ProcurementOperation />
    </div>
  )
}
