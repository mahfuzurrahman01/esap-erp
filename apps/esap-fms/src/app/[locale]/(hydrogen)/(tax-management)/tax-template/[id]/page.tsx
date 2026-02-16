import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditTaxTemplateForm from "@/modules/fms/components/containers/tax-template/create-tax-template-form"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`View ${id}`)
}

const pageHeader = {
  title: "text-view-tax-template",
  breadcrumb: [
    {
      href: routes.fms.taxTemplate,
      name: "text-tax-template",
    },
    {
      name: "text-view",
    },
  ],
}

export default async function TaxTemplateViewPage(
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
            href={routes.fms.editTaxTemplate(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <CreateEditTaxTemplateForm id={id} mode="view" />
    </div>
  )
}
