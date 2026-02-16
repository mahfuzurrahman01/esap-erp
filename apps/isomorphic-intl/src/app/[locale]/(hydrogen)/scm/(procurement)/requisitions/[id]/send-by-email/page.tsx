import { metaObject } from "@/config/site.config"
import SendByEmailPage from "@/modules/scm/components/templates/procurement/requisition/send-by-email"

export const metadata = {
  ...metaObject("Send To Email"),
}

export default function page() {
  return (
    <>
      <SendByEmailPage />
    </>
  )
}
