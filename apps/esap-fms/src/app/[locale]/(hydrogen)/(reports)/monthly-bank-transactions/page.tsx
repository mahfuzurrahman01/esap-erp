import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import MonthlyBankTransactionsList from "@/modules/fms/components/templates/reports/monthly-bank-transactions-list"

export const metadata = {
  ...metaObject("Monthly Bank Transactions List"),
}

const pageHeader = {
  title: "text-monthly-bank-transactions",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-monthly-bank-transactions",
    },
  ],
}

export default function MonthlyBankTransactions() {
  return (
    <>
      <MonthlyBankTransactionsList pageHeader={pageHeader} />
    </>
  )
}
