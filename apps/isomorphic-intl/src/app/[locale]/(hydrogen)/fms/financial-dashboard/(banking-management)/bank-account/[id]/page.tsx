import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import BankAccountView from "@/modules/fms/components/templates/bank-account-list/bank-account-view"

export const metadata = {
  ...metaObject("View Accounts"),
}

const pageHeader = {
  title: "text-bank-account",
  breadcrumb: [
    {
      href: routes.fms.bankAccount,
      name: "text-bank-account",
    },
    {
      name: "text-view-account",
    },
  ],
}

export default async function BankAccountDetailsPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editBankAccount(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <BankAccountView id={params.id} />
    </>
  )
}
