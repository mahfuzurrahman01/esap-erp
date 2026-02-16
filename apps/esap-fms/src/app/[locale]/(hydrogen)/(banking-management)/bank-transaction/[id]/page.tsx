import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditBankTransactionForm from "@/modules/fms/components/containers/bank-transaction/create-edit-form"

export const metadata = {
  ...metaObject("View Bank Transaction"),
}

const pageHeader = {
  title: "text-bank-transaction",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-transaction",
    },
    {
      name: "text-view-bank-transaction",
    },
  ],
}

export default async function ViewBankTransactionPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editBankTransaction(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div> */}
      </PageHeader>
      <CreateEditBankTransactionForm id={params.id} mode="view" />
    </>
  )
}
