import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import DocumentationContainer from "@/modules/fms/components/containers/documents"

export const metadata = {
  ...metaObject("Documents"),
}

const pageHeader = {
    title: "text-documents",
    breadcrumb: [
      {
        name: "text-documents",
      },
    ],
  }

export default function DocumentsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <DocumentationContainer />
    </>
  )
}
