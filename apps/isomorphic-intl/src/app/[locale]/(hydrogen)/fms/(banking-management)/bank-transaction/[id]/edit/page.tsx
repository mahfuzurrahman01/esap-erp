import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditBankTransactionForm from "@/modules/fms/components/containers/bank-transaction/create-edit-form"

export const metadata = {
  ...metaObject("Edit Bank Transaction"),
}

const pageHeader = {
  title: "text-edit-bank-transaction",
  breadcrumb: [
    {
      href: routes.fms.bankTransaction,
      name: "text-bank-transaction",
    },
    {
      name: "text-edit-bank-transaction",
    },
  ],
}

export default async function EditBankTransactionPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditBankTransactionForm id={parseInt(params.id)} mode="edit" />
    </>
  )
}
