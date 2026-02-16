import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ApprovalListTemplate from "@/modules/crm/components/templates/approvals"

export const metadata = {
  ...metaObject("Approval List"),
}

const pageHeader = {
  title: "text-approvals",
  breadcrumb: [
    {
      href: routes.crm.approvals,
      name: "text-approval",
    },
    {
      name: "text-list",
    },
  ],
}

export default function ApprovalListPage() {
  return (
    <div className="@container">
       <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <ApprovalListTemplate />
    </div>
  )
}
