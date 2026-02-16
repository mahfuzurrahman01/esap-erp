import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditForm from "@/modules/fms/components/containers/accounting/coa/create-edit-form"

export const metadata = {
  ...metaObject("Edit Account"),
}

const pageHeader = {
  title: "text-edit-account",
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
      name: "text-edit-account",
    },
  ],
}

export default async function COAEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditForm id={parseInt(params.id)} mode="edit" />
    </>
  )
}
