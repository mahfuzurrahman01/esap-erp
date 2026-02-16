import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import { CompanyPageTemplate } from "@/modules/fms/components/templates/company/company"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`Company ${id}`)
}

const pageHeader = {
  title: "text-view-company",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      href: routes.fms.company,
      name: "text-company",
    },
    {
      name: "text-view",
    },
  ],
}

export default async function CompanyViewPage(
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
            href={routes.fms.editCompany(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-4 w-4" />}
          />
        </div>
      </PageHeader>
      <CompanyPageTemplate id={params.id} mode="view" />
    </>
  )
}
