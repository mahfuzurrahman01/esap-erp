import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateBudgetTemplate from "@/modules/fms/components/templates/budget-template/create-budget-template"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`View Budget Distribution ${id}`)
}

const pageHeader = {
  title: "text-view-budget-distribution",
  breadcrumb: [
    {
      href: routes.fms.budgetDistribution,
      name: "text-budget-distribution",
    },
    {
      name: "text-view",
    },
  ],
}

export default async function BudgetDistributionPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  const { id } = params

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editBudgetDistribution(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateBudgetTemplate id={id} mode="view" />
    </div>
  )
}
