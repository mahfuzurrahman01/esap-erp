import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import SettingCreateTemplate from "@/modules/crm/components/templates/settings"

export const metadata = {
  ...metaObject("Edit Setting"),
}

const pageHeader = {
  title: "text-edit-setting",
  breadcrumb: [
    {
      name: "text-settings",
    },
    {
      name: "text-edit-setting",
    },
  ],
}

export default function SettingCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <SettingCreateTemplate />
    </>
  )
}
