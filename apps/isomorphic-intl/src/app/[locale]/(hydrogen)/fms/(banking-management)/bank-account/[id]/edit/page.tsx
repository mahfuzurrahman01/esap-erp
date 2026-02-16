import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditBankAccountForm from "@/modules/fms/components/containers/bank-account/create-edit-bank-form"

export const metadata = {
  ...metaObject("Edit Account"),
}

const pageHeader = {
  title: "text-edit-account",
  breadcrumb: [
    {
      href: routes.fms.bankAccount,
      name: "text-bank-account",
    },
    {
      name: "text-edit-account",
    },
  ],
}

export default async function COAEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditBankAccountForm id={parseInt(params.id)} mode="edit" />
    </>
  )
}
