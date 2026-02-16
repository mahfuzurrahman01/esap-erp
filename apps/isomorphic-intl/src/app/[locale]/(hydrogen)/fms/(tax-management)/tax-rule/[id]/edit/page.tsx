import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditTaxRule from "@/modules/fms/components/templates/tax-rule/create-edit-tax-rule"

export const metadata = {
  ...metaObject("Edit Tax Rule"),
}

const pageHeader = {
  title: "text-edit-tax-rule",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      href: routes.fms.taxRule,
      name: "text-tax-rule",
    },
    {
      name: "text-edit-tax-rule",
    },
  ],
}

export default async function TaxRuleEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditTaxRule id={parseInt(params.id)} mode="edit" />
    </>
  )
}
