import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditTaxRule from "@/modules/fms/components/templates/tax-rule/create-edit-tax-rule"

export const metadata = {
  ...metaObject("Tax Rule"),
}

const pageHeader = {
  title: "text-tax-rule",
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
      name: "text-view-tax-rule",
    },
  ],
}

export default async function TaxRuleDetailsPage(
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
            href={routes.fms.editTaxRule(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditTaxRule id={params.id} mode="view" />
    </>
  )
}
