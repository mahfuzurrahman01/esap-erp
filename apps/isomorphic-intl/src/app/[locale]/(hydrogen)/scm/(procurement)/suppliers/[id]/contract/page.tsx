import { metaObject } from "@/config/site.config"
import ContractFormPage from "@/modules/scm/components/templates/procurement/supplier/contract"

export const metadata = {
  ...metaObject("Contract Form"),
}

export default function page() {
  return (
    <>
      <ContractFormPage />
    </>
  )
}
