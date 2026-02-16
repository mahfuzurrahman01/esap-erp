import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import EmailSettingCreateTemplate from "@/modules/crm/components/templates/settings/email"

export const metadata = {
  ...metaObject("Edit Email Setting"),
}

const pageHeader = {
  title: "text-edit-email-setting",
  breadcrumb: [
    {
      name: "text-settings",
    },
    {
      name: "text-email-setting",
    },
  ],
}

export default function SettingCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <EmailSettingCreateTemplate />
    </>
  )
}
