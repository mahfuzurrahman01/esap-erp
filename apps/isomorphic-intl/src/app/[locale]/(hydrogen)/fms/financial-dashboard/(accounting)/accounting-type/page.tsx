import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import AccountTypesList from "@/modules/fms/components/templates/account-type-list"

export const metadata = {
  ...metaObject("Account Type List"),
}

const pageHeader = {
  title: "text-account-type",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-account-type",
    },
  ],
}

export default function AccountTypePage() {
  return (
    <>
      <AccountTypesList pageHeader={pageHeader} />
    </>
  )
}
