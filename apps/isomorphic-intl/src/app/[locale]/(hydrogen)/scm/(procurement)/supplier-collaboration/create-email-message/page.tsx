import { metaObject } from "@/config/site.config"
import CreateEmailMessagePage from "@/modules/scm/components/templates/procurement/supplier-collaboration/create-email-message"

export const metadata = {
  ...metaObject("Create Email Message"),
}

export default function page() {
  return (
    <div>
      <CreateEmailMessagePage />
    </div>
  )
}
