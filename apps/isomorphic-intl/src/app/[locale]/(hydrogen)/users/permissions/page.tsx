"use client"

import { useTranslations } from "next-intl"
import { PiPlusBold } from "react-icons/pi"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import PermissionFormDrawerView from "@/modules/crm/components/containers/permissions/permission-form-drawer-view"
import PermissionListTemplate from "@/modules/crm/components/templates/permissions"

// export const metadata = {
//   ...metaObject("Permission List"),
// }

const pageHeader = {
  title: "text-permissions",
  breadcrumb: [
    {
      href: routes.crm.permissions,
      name: "text-permissions",
    },
    {
      name: "text-list",
    },
  ],
}

export default function PermissionList() {
  const { openDrawer } = useDrawer()
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            type="button"
            className="h-9 cursor-pointer rounded-lg border border-transparent bg-gray-900 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 focus-visible:ring-muted dark:bg-gray-100 dark:text-gray-900 dark:backdrop-blur dark:hover:bg-gray-200"
            onClick={() =>
              openDrawer({
                view: <PermissionFormDrawerView />,
                placement: "right",
                containerClassName: "max-w-[26.25rem] dropdown-gr",
              })
            }>
            <PiPlusBold className="me-1.5 h-4 w-4" />
            {t("form-create")}
          </Button>
        </div>
      </PageHeader>

      <div className="@container">
        <PermissionListTemplate />
      </div>
    </>
  )
}
