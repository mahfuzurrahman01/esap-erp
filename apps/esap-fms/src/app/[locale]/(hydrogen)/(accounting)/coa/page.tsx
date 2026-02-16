"use client"

import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { useCurrentRole } from "@/hooks/use-current-role"
import { ADMIN_MENU_ROLES } from "@/layouts/beryllium/fixed-menu-items/user-roles"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import COATable from "@/modules/fms/components/containers/accounting/coa"

const pageHeader = {
  title: "text-coa",
  breadcrumb: [
    {
      href: routes.fms.coa,
      name: "text-home",
    },
    {
      name: "text-coa",
    },
  ],
}

export default function FMSPage() {
  // const { hasAnyRole } = useCurrentRole()

  // const isCreateVisible = hasAnyRole(ADMIN_MENU_ROLES)

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* {isCreateVisible && (
        )} */}
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <TranslatableButton
              href={routes.fms.createCOA}
              title="text-create"
              icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
            />
          </div>
      </PageHeader>

      <COATable />
    </>
  )
}
