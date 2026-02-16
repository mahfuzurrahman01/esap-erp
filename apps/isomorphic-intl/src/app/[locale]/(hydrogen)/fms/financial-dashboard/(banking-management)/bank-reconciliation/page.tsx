import { PiCloudArrowUpBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BankReconciliation from "@/modules/fms/components/containers/bank-reconciliation/bank-reconciliation-form"

export const metadata = {
  ...metaObject("Bank Reconciliation"),
}

const pageHeader = {
  title: "text-bank-reconciliation",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-transaction",
    },
    {
      name: "text-bank-reconciliation",
    },
  ],
}

export default function BankReconciliationPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.bankStatementImport}
            title="text-upload-bank-statement"
            icon={<PiCloudArrowUpBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BankReconciliation />
    </>
  )
}
