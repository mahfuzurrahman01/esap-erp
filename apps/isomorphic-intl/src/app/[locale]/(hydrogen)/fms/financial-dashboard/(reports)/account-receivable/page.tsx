import { metaObject } from "@/config/site.config"
import AccountsReceivableReportPageList from "@/modules/fms/components/templates/reports/accounts-receivable-template/accounts-receivable"


export const metadata = {
  ...metaObject("Accounts Receivable Report"),
}


export default function AccountsReceivableReportPage() {
  return <AccountsReceivableReportPageList />
}
