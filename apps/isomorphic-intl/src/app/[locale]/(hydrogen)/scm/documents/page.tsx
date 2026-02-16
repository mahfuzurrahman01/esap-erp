import { metaObject } from "@/config/site.config"
import DocumentsPage from "@/modules/scm/components/templates/documents"

export const metadata = {
  ...metaObject("SCM Documents"),
}

export default function page() {
  return <DocumentsPage />
}