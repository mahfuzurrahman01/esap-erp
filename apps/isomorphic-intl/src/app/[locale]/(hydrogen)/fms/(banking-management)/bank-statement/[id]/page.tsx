import PageHeader from "@/components/base/page-header"
import EyeIcon from "@/components/icons/eye"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import ImportBankStatement from "@/modules/fms/components/templates/import-bank-statement"

export const metadata = {
  ...metaObject("Import Bank Statement"),
}

const pageHeader = {
  title: "text-import-bank-statement",
  breadcrumb: [
    {
      href: routes.fms.importBankStatement,
      name: "text-import-bank-statement-list",
    },
    {
      name: "text-import-bank-statement",
    },
  ],
}

export default async function FMSPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.bankTransaction}
            title="text-go-to-bank-transaction-list"
            icon={<EyeIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <ImportBankStatement id={params.id} mode="view" />
    </>
  )
}
