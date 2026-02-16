import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBudgetTemplate from "@/modules/fms/components/templates/budget-template/create-budget-template"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`Edit ${id}`)
}

const pageHeader = {
  title: "text-edit-budget-distribution",
  breadcrumb: [
    {
      href: routes.fms.budgetDistribution,
      name: "text-budget-distribution",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function BudgetDistributionEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  const { id } = params

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateBudgetTemplate id={id} mode="edit" />
    </div>
  )
}
