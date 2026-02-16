import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import { UserListTemplate } from "@/modules/crm/components/templates/users"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("User List"),
}

const pageHeader = {
  title: "text-users",
  breadcrumb: [
    {
      href: routes.crm.dashboard,
      name: "text-home",
    },
    {
      name: "text-list",
    },
  ],
}

export default function UserList() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.userCreate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <UserListTemplate />
      </div>
    </>
  )
}
