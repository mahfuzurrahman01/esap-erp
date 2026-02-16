import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateBudget from "@/modules/fms/components/templates/budget/create-budget"

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
  title: "text-edit-budget",
  breadcrumb: [
    {
      href: routes.fms.budget,
      name: "text-budget",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function BudgetEditPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const { id } = params

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateBudget id={id} mode="edit" />
    </div>
  )
}
