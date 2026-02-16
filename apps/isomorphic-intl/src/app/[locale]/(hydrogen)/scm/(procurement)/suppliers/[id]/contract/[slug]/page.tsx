import { metaObject } from "@/config/site.config"
import ContractDetails from "@/modules/scm/components/templates/procurement/supplier/contract-view"

export const metadata = {
  ...metaObject("Contract Details"),
}

export default function page() {
  return (
    <>
      <ContractDetails />
    </>
  )
}
