import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditTermsAndConditionsForm from "@/modules/fms/components/containers/terms-and-conditions/create-edit-terms-and-conditions-form"

export const metadata = {
  ...metaObject("Create Terms and Conditions"),
}

const pageHeader = {
  title: "text-create-terms-and-conditions",
  breadcrumb: [
    {
      href: routes.fms.termsAndConditions,
      name: "text-terms-and-conditions",
    },
    {
      name: "text-create-terms-and-conditions",
    },
  ],
}

export default function TermsAndConditionsCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditTermsAndConditionsForm />
    </>
  )
}
