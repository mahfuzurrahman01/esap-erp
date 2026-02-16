import { metaObject } from "@/config/site.config"
import ContractRenewalsPage from "@/modules/scm/components/templates/procurement/supplier/contract-renewals"

export const metadata = {
  ...metaObject("Contract Renewals"),
}

export default function page() {
  return (
    <>
      <ContractRenewalsPage />
    </>
  )
}
