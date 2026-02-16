import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BankStatementImportTable from "@/modules/fms/components/containers/bank-statement-import"

export const metadata = {
  ...metaObject("Bank Statements"),
}

const pageHeader = {
  title: "text-import-bank-statement-list",
  breadcrumb: [
    {
      name: "text-bank-statement",
    },
  ],
}

export default function BankStatementPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.bankStatementImport}
            title="text-import-bank-statement"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <BankStatementImportTable />
    </>
  )
}
