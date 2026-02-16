import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditTaxTemplateForm from "@/modules/fms/components/containers/tax-template/create-tax-template-form"

export const metadata = {
  ...metaObject("Create Tax Template"),
}

const pageHeader = {
  title: "text-create-tax-template",
  breadcrumb: [
    {
      href: routes.fms.taxTemplate,
      name: "text-tax-template",
    },
    {
      name: "text-create-tax-template",
    },
  ],
}

export default function CreateTaxTemplatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditTaxTemplateForm />
    </>
  )
}
