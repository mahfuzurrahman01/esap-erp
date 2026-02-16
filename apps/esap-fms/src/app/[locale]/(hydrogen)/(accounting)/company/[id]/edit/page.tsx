import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import { CompanyPageTemplate } from "@/modules/fms/components/templates/company/company"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`Edit Company ${id}`)
}

const pageHeader = {
  title: "text-edit-company",
  breadcrumb: [
    {
      href: routes.fms.company,
      name: "text-company",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function CompanyEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CompanyPageTemplate id={params.id} mode="edit" />
    </>
  )
}
