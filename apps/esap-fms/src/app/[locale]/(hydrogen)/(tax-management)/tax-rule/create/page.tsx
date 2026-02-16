import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateTaxRule from "@/modules/fms/components/templates/tax-rule/create-edit-tax-rule"

export const metadata = {
  ...metaObject("Create Tax Rule"),
}

const pageHeader = {
  title: "text-create-tax-rule",
  breadcrumb: [
    {
      href: routes.fms.taxRule,
      name: "text-home",
    },
    {
      name: "text-create-tax-rule",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateTaxRule />
    </>
  )
}
