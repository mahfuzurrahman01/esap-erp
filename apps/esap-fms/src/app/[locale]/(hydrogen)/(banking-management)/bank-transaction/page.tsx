import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BankTransactionTable from "@/modules/fms/components/containers/bank-transaction"

export const metadata = {
  ...metaObject("Bank Transactions"),
}

const pageHeader = {
  title: "text-bank-transaction",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-home",
    },
    {
      name: "text-bank-transaction",
    },
  ],
}

export default function BankTransactionPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createBankTransaction}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BankTransactionTable />
    </>
  )
}
