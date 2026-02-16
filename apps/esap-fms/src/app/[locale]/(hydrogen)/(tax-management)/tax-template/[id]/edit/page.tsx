import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateEditTaxTemplateForm from "@/modules/fms/components/containers/tax-template/create-tax-template-form"

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
  title: "text-edit-tax-template",
  breadcrumb: [
    {
      href: routes.fms.taxTemplate,
      name: "text-tax-template",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function TaxTemplateEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  const { id } = params

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditTaxTemplateForm id={id} mode="edit" />
    </div>
  )
}
