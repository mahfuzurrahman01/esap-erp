import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateAccount from "@/modules/fms/components/templates/coa/create-account"

export const metadata = {
  ...metaObject("Accounts"),
}

const pageHeader = {
  title: "text-coa",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      href: routes.fms.coa,
      name: "text-coa",
    },
    {
      name: "text-view-account",
    },
  ],
}

export default async function COADetailsPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editCOA(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateAccount id={params.id} mode="view" />
    </>
  )
}
