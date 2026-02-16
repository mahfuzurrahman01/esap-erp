import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BankAccountTable from "@/modules/fms/components/containers/bank-account"

export const metadata = {
  ...metaObject("Bank Accounts"),
}

const pageHeader = {
  title: "text-bank-account",
  breadcrumb: [
    {
      href: routes.fms.bankAccount,
      name: "text-home",
    },
    {
      name: "text-bank-account",
    },
  ],
}

export default function BankAccountPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createBankAccount}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BankAccountTable />
    </>
  )
}
