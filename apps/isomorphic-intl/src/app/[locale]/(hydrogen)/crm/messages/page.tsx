import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import MessageListTemplate from "@/modules/crm/components/templates/messages"

export const metadata = {
  ...metaObject("Message List"),
}

const pageHeader = {
  title: "text-message-list",
  breadcrumb: [
    {
      href: routes.crm.messages,
      name: "text-message",
    },
    {
      name: "text-list",
    },
  ],
}

export default function MessagePage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <div className="h-full @container">
        <MessageListTemplate />
      </div>
    </>
  )
}
