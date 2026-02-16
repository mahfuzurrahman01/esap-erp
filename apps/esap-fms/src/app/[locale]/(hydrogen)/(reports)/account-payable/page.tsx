import { metaObject } from "@/config/site.config"
import AccountsPayableReportPageList from "@/modules/fms/components/templates/reports/accounts-payable-template/accounts-payable"


export const metadata = {
  ...metaObject("Accounts Payable Report"),
}


export default function AccountsPayableReportPage() {
  return <AccountsPayableReportPageList />
}
