import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import { CompanyPageTemplate } from "@/modules/fms/components/templates/company/company"

export const metadata = {
  ...metaObject("Create Company"),
}

const pageHeader = {
  title: "text-create-company",
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
      name: "text-create-company",
    },
  ],
}

export default function CompanyCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CompanyPageTemplate />
    </>
  )
}
