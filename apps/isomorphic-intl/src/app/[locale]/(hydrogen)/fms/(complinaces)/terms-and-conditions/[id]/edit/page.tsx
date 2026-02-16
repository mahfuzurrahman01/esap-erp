import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditTermsAndConditionsForm from "@/modules/fms/components/containers/terms-and-conditions/create-edit-terms-and-conditions-form"

export const metadata = {
  ...metaObject("Edit Terms and Conditions"),
}

const pageHeader = {
  title: "text-edit-terms-and-conditions",
  breadcrumb: [
    {
      href: routes.fms.termsAndConditions,
      name: "text-terms-and-conditions",
    },
    {
      name: "text-edit-terms-and-conditions",
    },
  ],
}

export default async function TermsAndConditionsEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditTermsAndConditionsForm id={params.id} mode="edit" />
    </>
  )
}
