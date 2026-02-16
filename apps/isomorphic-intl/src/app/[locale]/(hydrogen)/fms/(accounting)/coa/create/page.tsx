import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateAccount from "@/modules/fms/components/templates/coa/create-account"

export const metadata = {
  ...metaObject("Create Account"),
}

const pageHeader = {
  title: "text-create-account",
  breadcrumb: [
    {
      href: routes.fms.coa,
      name: "text-home",
    },
    {
      name: "text-create-account",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateAccount />
    </>
  )
}
